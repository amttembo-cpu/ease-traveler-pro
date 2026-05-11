import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — easetraveler.net" },
      { name: "description", content: "Get in touch with Ease Travel Solutions. Phone, email and our Lusaka office address." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <p className="text-sm text-primary font-semibold uppercase tracking-wider">Contact</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">We'd love to hear from you.</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Whether you need help booking, want to customise a package, or just have a question — our
        TravelBar team responds within one business day.
      </p>

      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Info icon={<MapPin className="w-5 h-5" />} title="Office">
            Agora Village<br />Thabo Mbeki Road<br />Lusaka, Zambia
          </Info>
          <Info icon={<Mail className="w-5 h-5" />} title="Email">
            <a href="mailto:hello@easetraveler.net" className="hover:text-primary">hello@easetraveler.net</a><br />
            <a href="mailto:bookings@easetraveler.net" className="hover:text-primary">bookings@easetraveler.net</a>
          </Info>
          <Info icon={<Phone className="w-5 h-5" />} title="Phone">
            +260 97 000 0000<br />+260 21 100 0000
          </Info>
          <Info icon={<Clock className="w-5 h-5" />} title="Hours">
            Mon–Fri 08:00–18:00<br />Sat 09:00–13:00<br />Sun closed
          </Info>
          <p className="text-xs text-muted-foreground">
            Ease Travel Solutions · Reg No 120261043921
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8"
        >
          {sent ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-foreground">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">A TravelBar consultant will reply within 1 business day.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-foreground">Send a message</h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <Input name="name" label="Full name" required />
                <Input name="email" label="Email" type="email" required />
                <Input name="phone" label="Phone" type="tel" />
                <Input name="topic" label="Topic" placeholder="e.g. Custom honeymoon" />
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-foreground">Message</span>
                  <textarea
                    required
                    rows={5}
                    className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>
              <button type="submit" className="mt-6 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-dark">
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Input({ name, label, type = "text", ...rest }: { name: string; label: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
