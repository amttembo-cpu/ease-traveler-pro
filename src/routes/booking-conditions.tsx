import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/booking-conditions")({
  head: () => ({ meta: [{ title: "Booking Conditions — easetraveler.net" }, { name: "description", content: "Detailed booking conditions for holiday packages on easetraveler.net." }] }),
  component: () => (
    <LegalLayout title="Booking Conditions" updated="11 May 2026">
      <p>These Booking Conditions form part of the contract between you and Ease Travel Solutions ("we") whenever you book a holiday package through easetraveler.net.</p>
      <h2>1. Deposits and payment schedule</h2>
      <ul>
        <li>A deposit of 25% of the total package price (or as displayed) is payable at the time of booking.</li>
        <li>The balance is due no later than 60 days before departure.</li>
        <li>For bookings made within 60 days of departure, full payment is required at checkout.</li>
      </ul>
      <h2>2. Pricing and currency</h2>
      <p>Prices are quoted per person sharing in South African Rand (ZAR) and include the components listed in the package "What's Included" section. Until paid in full, prices remain subject to changes in airfares, fuel surcharges, government taxes and exchange rates.</p>
      <h2>3. Travel documents</h2>
      <p>You must hold a passport valid for at least six months beyond your return date and obtain any required visas. We can advise but the responsibility lies with you.</p>
      <h2>4. Health and vaccinations</h2>
      <p>Check current vaccination, medication and health requirements with a travel clinic well before departure. Yellow fever certificates may be required for travel in or via certain African countries.</p>
      <h2>5. Insurance</h2>
      <p>Comprehensive travel insurance covering cancellation, medical evacuation, baggage loss and personal liability is mandatory for all international bookings.</p>
      <h2>6. Special requests</h2>
      <p>We pass on dietary, accessibility, room-type or twin/double-bed requests to suppliers but cannot guarantee fulfilment unless confirmed in writing.</p>
      <h2>7. Behaviour</h2>
      <p>Suppliers reserve the right to refuse or terminate service for travellers whose behaviour endangers others, breaches local laws, or causes wilful damage. No refund will be due in such circumstances.</p>
      <h2>8. Complaints</h2>
      <p>If something is not as expected during your trip, notify the supplier immediately and call our 24/7 emergency line so we can attempt to resolve it on the spot. Written complaints must reach us within 28 days of return to be considered.</p>
      <h2>9. Acceptance</h2>
      <p>By completing payment you confirm that you have read, understood and accepted these Booking Conditions on behalf of every traveller named in the booking.</p>
    </LegalLayout>
  ),
});
