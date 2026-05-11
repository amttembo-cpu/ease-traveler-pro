import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — easetraveler.net" }, { name: "description", content: "The terms and conditions governing use of easetraveler.net and bookings made with Ease Travel Solutions." }] }),
  component: () => (
    <LegalLayout title="Terms & Conditions" updated="11 May 2026">
      <p>These Terms govern your use of easetraveler.net (the "Site") and any travel package, accommodation, flight, transfer or related service ("Travel Services") booked through it. The Site and the Travel Services are provided by <strong>Ease Travel Solutions</strong> (Reg No 120261043921), a company registered in Zambia with its principal office at Agora Village, Thabo Mbeki Road, Lusaka ("we", "us", "easetraveler.net").</p>
      <p>By accessing the Site or making a booking, you confirm that you have read, understood and accepted these Terms.</p>
      <h2>1. Eligibility</h2>
      <p>You must be at least 18 years old and legally able to enter into binding contracts. By booking on behalf of other travellers, you warrant that you have their authority to do so and to accept these Terms on their behalf.</p>
      <h2>2. Bookings and contract formation</h2>
      <ul>
        <li>All bookings are subject to availability and confirmation.</li>
        <li>A binding contract is only formed once we issue a written booking confirmation and your deposit (or full payment) has cleared.</li>
        <li>Pricing on the Site is indicative and may change up to the moment of confirmation due to currency, supplier or tax adjustments.</li>
      </ul>
      <h2>3. Pricing and payment</h2>
      <p>Prices are quoted in South African Rand (ZAR) per person sharing unless otherwise stated and exclude travel insurance, optional excursions, and personal expenses. We accept Visa, Mastercard and American Express. A non-refundable booking fee applies as displayed at checkout.</p>
      <h2>4. Changes by you</h2>
      <p>Requests to change a confirmed booking are subject to supplier policies and an administration fee. We will pass through any unavoidable supplier charges at cost.</p>
      <h2>5. Cancellations</h2>
      <p>Cancellation terms vary by supplier and are disclosed before payment. See our <a href="/refund">Refund Policy</a> for the full schedule.</p>
      <h2>6. Travel documents and health</h2>
      <p>You are responsible for ensuring your passport, visas, vaccinations and other travel documents are valid and in order. We may provide guidance but accept no liability for refused boarding or entry.</p>
      <h2>7. Our liability</h2>
      <p>We act as an intermediary between you and the airlines, hotels and ground operators that provide your Travel Services. To the maximum extent permitted by law, our total liability arising from any booking is limited to the amount paid by you to us for that booking.</p>
      <h2>8. Force majeure</h2>
      <p>We are not liable for any failure to perform caused by events beyond our reasonable control, including extreme weather, civil unrest, pandemics, government restrictions, strikes or supplier insolvency.</p>
      <h2>9. Intellectual property</h2>
      <p>All content on the Site — including text, design, photography and the easetraveler.net brand — is owned by or licensed to Ease Travel Solutions and may not be reproduced without written permission.</p>
      <h2>10. Governing law</h2>
      <p>These Terms are governed by the laws of the Republic of Zambia. Disputes are subject to the exclusive jurisdiction of the Zambian courts.</p>
      <h2>11. Contact</h2>
      <p>Questions about these Terms? Email <a href="mailto:legal@easetraveler.net">legal@easetraveler.net</a>.</p>
    </LegalLayout>
  ),
});
