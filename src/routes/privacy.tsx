import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — easetraveler.net" }, { name: "description", content: "How Ease Travel Solutions collects, uses and protects your personal data on easetraveler.net." }] }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="11 May 2026">
      <p>Ease Travel Solutions ("we", "us") respects your privacy. This policy explains what personal data we collect through easetraveler.net, why we collect it, and the rights you have over it.</p>
      <h2>1. Data we collect</h2>
      <ul>
        <li><strong>Account & booking data</strong> — name, email, phone, billing address, passport details (where required), traveller preferences.</li>
        <li><strong>Payment data</strong> — card details are entered directly into our PCI-DSS-compliant payment processor; we do not store full card numbers on our servers.</li>
        <li><strong>Usage data</strong> — pages visited, device type, IP address, referral source, collected via cookies and analytics.</li>
        <li><strong>Communications</strong> — emails, chat transcripts, call recordings (where disclosed).</li>
      </ul>
      <h2>2. How we use your data</h2>
      <ul>
        <li>To process and fulfil your bookings with airlines, hotels and ground operators.</li>
        <li>To send booking confirmations, itineraries and operational updates.</li>
        <li>To respond to enquiries and provide customer support.</li>
        <li>With your consent, to send marketing emails about offers and travel inspiration.</li>
        <li>To comply with legal, tax and anti-fraud obligations.</li>
      </ul>
      <h2>3. Sharing your data</h2>
      <p>We share data only with: (i) suppliers and operators required to deliver your trip; (ii) payment processors and fraud-prevention partners; (iii) cloud hosting and analytics providers; (iv) regulators and law enforcement where legally required. We never sell your personal data.</p>
      <h2>4. International transfers</h2>
      <p>Because travel is global, your data may be processed outside Zambia. We rely on contractual safeguards equivalent to those required under the Data Protection Act of Zambia and the EU GDPR where applicable.</p>
      <h2>5. Retention</h2>
      <p>Booking records are retained for 7 years for tax and consumer-protection purposes. Marketing data is retained until you unsubscribe.</p>
      <h2>6. Your rights</h2>
      <p>You may request access, correction, deletion, restriction or portability of your personal data, and object to direct marketing at any time. Email <a href="mailto:privacy@easetraveler.net">privacy@easetraveler.net</a>.</p>
      <h2>7. Security</h2>
      <p>We use TLS encryption, role-based access controls, and routine security reviews. No system is completely secure — please notify us immediately if you suspect unauthorised access to your account.</p>
      <h2>8. Children</h2>
      <p>The Site is not directed at children under 16. We do not knowingly collect their data without parental consent.</p>
      <h2>9. Changes</h2>
      <p>We may update this policy from time to time. Material changes will be highlighted on the Site for 30 days.</p>
      <h2>10. Data controller</h2>
      <p>Ease Travel Solutions, Reg No 120261043921, Agora Village, Thabo Mbeki Road, Lusaka, Zambia.</p>
    </LegalLayout>
  ),
});
