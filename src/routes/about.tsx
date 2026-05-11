import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ease Travel Solutions — easetraveler.net" },
      { name: "description", content: "easetraveler.net is operated by Ease Travel Solutions, a licensed travel company based in Lusaka serving travellers across Southern Africa." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <p className="text-sm text-primary font-semibold uppercase tracking-wider">About us</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">Travel made beautifully easy.</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
        easetraveler.net is the consumer holiday brand of <strong>Ease Travel Solutions</strong>,
        a Zambian-registered travel company (Reg No 120261043921) headquartered in Lusaka.
        We design, package and operate holidays for travellers across Southern Africa — from
        weekend safari escapes to once-in-a-lifetime honeymoons in the Maldives.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card icon={<Globe2 className="w-6 h-6" />} title="Locally rooted, globally connected">
          We're proudly headquartered at Agora Village on Thabo Mbeki Road in Lusaka, with on-the-ground supplier relationships across Africa, Europe, the Indian Ocean and Asia.
        </Card>
        <Card icon={<ShieldCheck className="w-6 h-6" />} title="Licensed and accountable">
          Every booking is contracted with Ease Travel Solutions, a registered company answerable to Zambian consumer law and IATA settlement standards through our wholesale partners.
        </Card>
        <Card icon={<Sparkles className="w-6 h-6" />} title="Hand-picked packages">
          We never list a property we wouldn't book ourselves. Our TravelBar consultants vet each hotel, lodge and ship before it appears on easetraveler.net.
        </Card>
        <Card icon={<Heart className="w-6 h-6" />} title="Real humans, always">
          Online convenience with the warmth of a high-street agent. Reach a real consultant 7 days a week before, during and after your trip.
        </Card>
      </div>

      <section className="mt-16 bg-surface border border-border rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our story</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Ease Travel Solutions was founded by a small team of African travel professionals who
          believed booking a holiday should feel as enjoyable as taking one. Tired of opaque
          pricing and hard-sell tactics, we built easetraveler.net as a transparent, curated
          marketplace — clear inclusions, real photography, no surprises at checkout.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Today our consultants help thousands of travellers each year discover safari camps in
          the Lower Zambezi, beach villas in Zanzibar and city escapes from Cape Town to Cairo.
          We're just getting started.
        </p>
      </section>

      <section className="mt-12 grid sm:grid-cols-3 gap-4 text-center">
        <Stat n="12 000+" l="Happy travellers" />
        <Stat n="60+" l="Destinations worldwide" />
        <Stat n="4.8 / 5" l="Average customer rating" />
      </section>

      <div className="mt-12 text-center">
        <Link to="/contact" className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-dark">
          Talk to a TravelBar consultant
        </Link>
      </div>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <p className="text-3xl font-bold text-primary">{n}</p>
      <p className="mt-1 text-sm text-muted-foreground">{l}</p>
    </div>
  );
}
