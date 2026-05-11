import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatUSD } from "@/lib/packages";
import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure checkout — easetraveler.net" },
      { name: "description", content: "Enter your card details to complete your holiday booking with Ease Travel Solutions." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && !done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link to="/" className="text-primary underline mt-4 inline-block">Browse packages</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "country", "cardName", "cardNumber", "expiry", "cvc"];
    required.forEach((k) => { if (!String(fd.get(k) ?? "").trim()) errs[k] = "Required"; });

    const email = String(fd.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";

    const card = String(fd.get("cardNumber") ?? "").replace(/\s/g, "");
    if (card && !/^\d{13,19}$/.test(card)) errs.cardNumber = "Enter a valid card number";

    const exp = String(fd.get("expiry") ?? "");
    if (exp && !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp)) errs.expiry = "MM/YY";

    const cvc = String(fd.get("cvc") ?? "");
    if (cvc && !/^\d{3,4}$/.test(cvc)) errs.cvc = "3–4 digits";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      const ref = "ETS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setReference(ref);
      setDone(true);
      clear();
      setSubmitting(false);
    }, 1400);
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-bold text-foreground">Booking confirmed</h1>
        <p className="mt-2 text-muted-foreground">Thanks — your booking reference is <span className="font-mono font-semibold text-foreground">{reference}</span>. A confirmation has been emailed to you. A TravelBar consultant from Ease Travel Solutions will be in touch within 1 business day to finalise the itinerary.</p>
        <button onClick={() => navigate({ to: "/" })} className="mt-8 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-dark">
          Back to packages
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Secure checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Your details are encrypted and never stored on this demo site.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Lead traveller">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="firstName" label="First name" error={errors.firstName} />
              <Field name="lastName" label="Last name" error={errors.lastName} />
              <Field name="email" label="Email" type="email" error={errors.email} />
              <Field name="phone" label="Phone" type="tel" error={errors.phone} />
            </div>
          </Section>

          <Section title="Billing address">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field className="sm:col-span-2" name="address" label="Street address" error={errors.address} />
              <Field name="city" label="City" error={errors.city} />
              <Field name="country" label="Country" error={errors.country} defaultValue="South Africa" />
            </div>
          </Section>

          <Section title="Card details">
            <div className="grid sm:grid-cols-6 gap-4">
              <Field className="sm:col-span-6" name="cardName" label="Name on card" error={errors.cardName} />
              <Field className="sm:col-span-6" name="cardNumber" label="Card number" placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength={23} error={errors.cardNumber} />
              <Field className="sm:col-span-3" name="expiry" label="Expiry (MM/YY)" placeholder="08/28" maxLength={5} error={errors.expiry} />
              <Field className="sm:col-span-3" name="cvc" label="CVC" placeholder="123" inputMode="numeric" maxLength={4} error={errors.cvc} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1.5"><Lock className="w-3 h-3" /> Visa, Mastercard, Amex accepted. 3D-Secure verified.</p>
          </Section>
        </div>

        <aside>
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-lg text-foreground">Your booking</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map(({ pkg, travelers }) => (
                <li key={pkg.id} className="flex justify-between gap-3">
                  <span className="text-foreground">{pkg.title} <span className="text-muted-foreground">× {travelers}</span></span>
                  <span className="font-medium text-foreground shrink-0">{formatUSD(pkg.priceUSD * travelers)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border mt-4 pt-4 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatUSD(total)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Booking fee</span><span>{formatUSD(450)}</span></div>
              <div className="flex justify-between font-semibold text-foreground text-base mt-2"><span>Total</span><span>{formatUSD(total + 450)}</span></div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? "Processing…" : `Pay ${formatUSD(total + 450)}`}
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground text-center">By paying you accept our <Link to="/terms" className="underline">Terms</Link> and <Link to="/booking-conditions" className="underline">Booking Conditions</Link>.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6">
      <h2 className="font-semibold text-lg text-foreground mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  name, label, type = "text", error, className = "", ...rest
}: { name: string; label: string; type?: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className={`mt-1.5 w-full px-3.5 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-destructive" : "border-input"}`}
      />
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
