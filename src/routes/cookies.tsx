import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — easetraveler.net" }, { name: "description", content: "How easetraveler.net uses cookies and similar technologies." }] }),
  component: () => (
    <LegalLayout title="Cookie Policy" updated="11 May 2026">
      <p>This Cookie Policy explains what cookies are, which cookies easetraveler.net uses, and how you can control them.</p>
      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work, improve their performance, and provide analytics and personalisation.</p>
      <h2>2. Cookies we use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for core functionality such as your shopping cart, login session and security. These cannot be turned off.</li>
        <li><strong>Performance & analytics</strong> — help us understand how visitors interact with the Site so we can improve it (for example, anonymised page-view counts).</li>
        <li><strong>Functional</strong> — remember preferences such as your preferred currency or recent searches.</li>
        <li><strong>Marketing</strong> — used by us and selected partners to show relevant offers on other websites. Set only with your consent.</li>
      </ul>
      <h2>3. Third-party cookies</h2>
      <p>Some cookies are placed by trusted third parties — analytics providers, payment processors and advertising networks. These providers are bound by data-processing agreements with us.</p>
      <h2>4. Managing cookies</h2>
      <p>You can manage non-essential cookies via the cookie banner shown on your first visit, or via your browser settings. Disabling cookies may impair some features of the Site, including the shopping cart and checkout flow.</p>
      <h2>5. Do Not Track</h2>
      <p>Our Site does not currently respond to browser "Do Not Track" signals, but we honour the preferences you set through our cookie banner.</p>
      <h2>6. Updates</h2>
      <p>We may update this Cookie Policy as we add or change tools. The "Last updated" date above reflects the most recent revision.</p>
      <h2>7. Contact</h2>
      <p>Questions about cookies? Email <a href="mailto:privacy@easetraveler.net">privacy@easetraveler.net</a>.</p>
    </LegalLayout>
  ),
});
