import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPackage, formatZAR, PACKAGES } from "@/lib/packages";
import { PackageCard } from "@/components/PackageCard";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Calendar, Check, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/packages/$id")({
  loader: ({ params }) => {
    const pkg = getPackage(params.id);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.pkg.title} — easetraveler.net` },
      { name: "description", content: loaderData?.pkg.description.slice(0, 160) ?? "" },
      { property: "og:title", content: `${loaderData?.pkg.title} — easetraveler.net` },
      { property: "og:description", content: loaderData?.pkg.description.slice(0, 160) ?? "" },
      { property: "og:image", content: loaderData?.pkg.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Package not found</h1>
      <Link to="/" className="text-primary underline mt-4 inline-block">Back to packages</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary underline mt-4">Retry</button>
    </div>
  ),
  component: PackageDetail,
});

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const { add, items } = useCart();
  const [travelers, setTravelers] = useState(2);
  const inCart = items.some((i) => i.pkg.id === pkg.id);

  const related = PACKAGES.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 3);

  return (
    <article>
      <div className="relative h-[40vh] md:h-[55vh] bg-muted">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">{pkg.category}</span>
            {pkg.tags.map((t: string) => (
              <span key={t} className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow">{pkg.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-white/90"><MapPin className="w-4 h-4" /> {pkg.destination}, {pkg.country}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">About this trip</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{pkg.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">What's included</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {pkg.includes.map((i) => (
                <li key={i} className="flex items-start gap-2 text-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" /> {i}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid sm:grid-cols-3 gap-4">
            <Stat icon={<Calendar className="w-5 h-5" />} label="Travel dates" value={`${pkg.validFrom} → ${pkg.validTo}`} />
            <Stat icon={<MapPin className="w-5 h-5" />} label="Stay" value={`${pkg.nights} nights`} />
            <Stat icon={<Users className="w-5 h-5" />} label="Hotel" value={pkg.hotel} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Good to know</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              All packages are quoted per person sharing. Single supplements, optional excursions and travel insurance can be added at checkout. A non-refundable deposit secures your booking; full payment is due 60 days before departure. Subject to availability and final confirmation by Ease Travel Solutions.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">From</p>
            <p className="text-3xl font-bold text-foreground">{formatZAR(pkg.priceZAR)}</p>
            <p className="text-xs text-muted-foreground">per person sharing</p>

            <label className="block mt-6 text-sm font-medium text-foreground">Travellers</label>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => setTravelers((n) => Math.max(1, n - 1))} className="w-9 h-9 rounded-full border border-border hover:bg-muted">−</button>
              <span className="font-semibold w-8 text-center">{travelers}</span>
              <button onClick={() => setTravelers((n) => n + 1)} className="w-9 h-9 rounded-full border border-border hover:bg-muted">+</button>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">{formatZAR(pkg.priceZAR * travelers)}</span>
            </div>

            <button
              onClick={() => add(pkg, travelers)}
              disabled={inCart}
              className="mt-4 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full hover:bg-primary-dark transition disabled:opacity-60"
            >
              {inCart ? "✓ Added to cart" : "Add to cart"}
            </button>
            <Link to="/cart" className="mt-2 block text-center text-sm text-primary hover:underline">Go to cart →</Link>
            <Link to="/contact" className="mt-4 block text-center text-sm text-muted-foreground hover:text-primary">Need help? Talk to a TravelBar expert</Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </section>
      )}
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="text-primary">{icon}</div>
      <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
    </div>
  );
}
