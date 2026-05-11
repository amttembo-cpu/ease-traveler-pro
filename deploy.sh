#!/usr/bin/env bash
# =============================================================================
# deploy.sh — One-time setup for easetraveler.net on a shared Contabo VPS
#
# SAFE FOR MULTI-DOMAIN VPS — this script:
#   - Does NOT remove any existing Nginx sites or virtual hosts
#   - Does NOT modify or restart services used by other domains
#   - Only adds a NEW site config for easetraveler.net
#   - Only obtains an SSL cert for easetraveler.net
#
# Run ONCE as root from the project directory:
#   bash deploy.sh
# =============================================================================
set -euo pipefail

DOMAIN="easetraveler.net"
WWW_ROOT="/var/www/easetraveler"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"
EMAIL="admin@easetraveler.net"   # ← change to your real email for SSL notices

# ---------------------------------------------------------------------------
# 1. Install only what is missing (idempotent — safe to run multiple times)
# ---------------------------------------------------------------------------
echo "==> Installing required packages (skipping already-installed ones)..."
apt-get update -y
apt-get install -y --no-install-recommends nginx certbot python3-certbot-nginx rsync curl

# ---------------------------------------------------------------------------
# 2. Open firewall ports ONLY if ufw is active — does NOT disable anything
# ---------------------------------------------------------------------------
if command -v ufw &>/dev/null && ufw status | grep -q "Status: active"; then
  echo "==> Adding firewall rules for HTTP/HTTPS (ufw)..."
  ufw allow 'Nginx Full' 2>/dev/null || true
else
  echo "==> ufw not active — skipping firewall step (iptables or no firewall)."
fi

# ---------------------------------------------------------------------------
# 3. Create web root (will not overwrite if it already exists)
# ---------------------------------------------------------------------------
echo "==> Creating web root at ${WWW_ROOT}..."
mkdir -p "${WWW_ROOT}"
chown -R www-data:www-data "${WWW_ROOT}"
chmod -R 755 "${WWW_ROOT}"

# ---------------------------------------------------------------------------
# 4. Install the Nginx site config — ONLY for easetraveler.net
#    Does NOT touch any other site configs or the default site
# ---------------------------------------------------------------------------
echo "==> Installing Nginx config for ${DOMAIN}..."

if [ -f "${NGINX_SITE}" ]; then
  echo "    Existing config found — backing up to ${NGINX_SITE}.bak"
  cp "${NGINX_SITE}" "${NGINX_SITE}.bak"
fi

cp "$(dirname "$0")/nginx.conf" "${NGINX_SITE}"

# Enable the site only if not already linked
if [ ! -L "/etc/nginx/sites-enabled/${DOMAIN}" ]; then
  ln -sf "${NGINX_SITE}" "/etc/nginx/sites-enabled/${DOMAIN}"
fi

# Validate config before reloading — will not reload if any site has errors
echo "==> Validating Nginx config..."
nginx -t
echo "==> Reloading Nginx (other sites remain unaffected)..."
systemctl reload nginx

# ---------------------------------------------------------------------------
# 5. Obtain SSL certificate — ONLY for easetraveler.net
#    Certbot adds HTTPS blocks to this site's config only
# ---------------------------------------------------------------------------
echo "==> Requesting Let's Encrypt SSL certificate for ${DOMAIN}..."
certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  -m "${EMAIL}" \
  --redirect

# ---------------------------------------------------------------------------
# 6. Generate SSH key pair for GitHub Actions deploys
#    Appends the public key to authorized_keys — does NOT replace existing keys
# ---------------------------------------------------------------------------
echo ""
echo "==> Generating SSH deploy key for GitHub Actions..."
KEY_FILE="/root/.ssh/github_actions_easetraveler"
ssh-keygen -t ed25519 -C "github-actions@${DOMAIN}" -f "${KEY_FILE}" -N ""

mkdir -p /root/.ssh
touch /root/.ssh/authorized_keys
chmod 700 /root/.ssh
# Append only — existing keys are not removed
cat "${KEY_FILE}.pub" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

PUBLIC_IP=$(curl -s --max-time 5 ifconfig.me || curl -s --max-time 5 api.ipify.org || echo "YOUR_VPS_IP")

echo ""
echo "================================================================"
echo " easetraveler.net VPS setup complete!"
echo "================================================================"
echo ""
echo " Now add these two secrets to GitHub:"
echo " Repository → Settings → Secrets and variables → Actions"
echo ""
echo " ┌─────────────────┬──────────────────────────────────────────┐"
echo " │ Secret name     │ Value                                    │"
echo " ├─────────────────┼──────────────────────────────────────────┤"
echo " │ VPS_HOST        │ ${PUBLIC_IP}"
echo " └─────────────────┴──────────────────────────────────────────┘"
echo ""
echo " SSH_PRIVATE_KEY — copy the entire block below:"
echo "----------------------------------------------------------------"
cat "${KEY_FILE}"
echo "----------------------------------------------------------------"
echo ""
echo " Once both secrets are set, push to 'main' to auto-deploy."
echo "================================================================"
