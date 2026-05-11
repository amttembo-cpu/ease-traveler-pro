#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Initial VPS setup for easetraveler.net
# Run ONCE as root on a fresh Contabo Ubuntu 22.04 / 24.04 VPS
# Usage: bash deploy.sh
# =============================================================================
set -euo pipefail

DOMAIN="easetraveler.net"
WWW_ROOT="/var/www/easetraveler"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"
EMAIL="admin@easetraveler.net"   # change if needed

echo "==> Updating system packages..."
apt-get update -y && apt-get upgrade -y

echo "==> Installing Nginx, Certbot, rsync..."
apt-get install -y nginx certbot python3-certbot-nginx rsync curl ufw

echo "==> Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Creating web root..."
mkdir -p "${WWW_ROOT}"
chown -R www-data:www-data "${WWW_ROOT}"
chmod -R 755 "${WWW_ROOT}"

echo "==> Installing Nginx site config..."
cp "$(dirname "$0")/nginx.conf" "${NGINX_SITE}"
ln -sf "${NGINX_SITE}" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Obtaining SSL certificate (Let's Encrypt)..."
certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  -m "${EMAIL}"

echo "==> Enabling Nginx on boot..."
systemctl enable nginx

# ---- SSH key for GitHub Actions ----
echo ""
echo "==> Generating SSH key pair for GitHub Actions..."
KEY_FILE="/root/.ssh/github_actions_deploy"
ssh-keygen -t ed25519 -C "github-actions-deploy@${DOMAIN}" -f "${KEY_FILE}" -N ""

# Authorize the key for root login (used by rsync in CI)
cat "${KEY_FILE}.pub" >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

echo ""
echo "============================================================"
echo " Setup complete!"
echo "============================================================"
echo ""
echo " Add the following two secrets to your GitHub repository"
echo " (Settings → Secrets and variables → Actions → New secret):"
echo ""
echo " Secret name : VPS_HOST"
echo " Secret value: $(curl -s ifconfig.me)"
echo ""
echo " Secret name : SSH_PRIVATE_KEY"
echo " Secret value (copy everything including the BEGIN/END lines):"
echo ""
cat "${KEY_FILE}"
echo ""
echo "============================================================"
echo " Once secrets are set, push to 'main' to trigger a deploy."
echo "============================================================"
