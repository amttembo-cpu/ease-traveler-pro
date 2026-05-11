import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/refund")({
  head: () => ({ meta: [{ title: "Refund Policy — easetraveler.net" }, { name: "description", content: "Cancellation and refund schedule for holiday packages booked through easetraveler.net." }] }),
  component: () => (
    <LegalLayout title="Refund Policy" updated="11 May 2026">
      <p>This Refund Policy applies to all holiday packages purchased through easetraveler.net and operated by Ease Travel Solutions. It should be read together with our <a href="/terms">Terms & Conditions</a> and <a href="/booking-conditions">Booking Conditions</a>.</p>
      <h2>1. Booking fee</h2>
      <p>The administrative booking fee disclosed at checkout is <strong>non-refundable</strong> once the booking is confirmed.</p>
      <h2>2. Standard cancellation schedule</h2>
      <p>Unless a stricter supplier policy applies (see section 3), cancellations made by you are charged on the following sliding scale of the total package price:</p>
      <ul>
        <li>More than 60 days before departure — 15% cancellation fee.</li>
        <li>60 to 31 days before departure — 35% cancellation fee.</li>
        <li>30 to 15 days before departure — 60% cancellation fee.</li>
        <li>14 to 8 days before departure — 85% cancellation fee.</li>
        <li>7 days or fewer, no-show, or partial use — 100% cancellation fee.</li>
      </ul>
      <h2>3. Supplier-specific terms</h2>
      <p>Airline tickets, cruise lines, lodges and certain hotels operate on stricter, often fully non-refundable terms. Where this applies, we will disclose it before you pay and the supplier policy will prevail.</p>
      <h2>4. Cancellations by us or by suppliers</h2>
      <p>If we or a supplier cancel your booking, you will be offered: (i) an alternative of equivalent or higher value at no extra cost; (ii) a credit voucher valid for 24 months; or (iii) a full refund of amounts paid to us, less any unrecoverable third-party costs.</p>
      <h2>5. How to request a refund</h2>
      <p>Email <a href="mailto:bookings@easetraveler.net">bookings@easetraveler.net</a> with your booking reference. Approved refunds are processed within 14 business days to the original payment method.</p>
      <h2>6. Travel insurance</h2>
      <p>We strongly recommend comprehensive travel insurance to cover cancellations caused by illness, family emergencies or other unforeseen events that fall outside our refund schedule.</p>
      <h2>7. Chargebacks</h2>
      <p>Initiating a card chargeback before contacting us may delay resolution. Please reach out first — we will work with you to find a fair outcome.</p>
    </LegalLayout>
  ),
});
