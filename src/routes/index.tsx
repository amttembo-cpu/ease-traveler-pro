import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PACKAGES, CATEGORIES, FILTER_TAGS } from "@/lib/packages";
import { PackageCard } from "@/components/PackageCard";
import { Search, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "easetraveler.net — Holiday packages from South Africa" },
      { name: "description", content: "Browse curated beach, safari, cruise, city and adventure holiday packages. Book online with Ease Travel Solutions." },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeRegion, setActiveRegion] = useState<"All" | "Local" | "International">("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"featured" | "price" | "deals" | "recent">("featured");

  const filtered = useMemo(() => {
    let list = [...PACKAGES];
    if (activeRegion !== "All") list = list.filter((p) => p.region === activeRegion);
    if (activeTag) list = list.filter((p) => p.tags.includes(activeTag) || p.category.includes(activeTag));
    if (activeCategory) {
      const cat = CATEGORIES.find((c) => c.id === activeCategory);
      if (cat) list = list.filter((p) => cat.match.includes(p.category));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q),
      );
    }
    if (sort === "price") list.sort((a, b) => a.priceUSD - b.priceUSD);
    if (sort === "deals") list = list.filter((p) => p.tags.includes("Hot Deal")).concat(list.filter((p) => !p.tags.includes("Hot Deal")));
    if (sort === "recent") list.reverse();
    return list;
  }, [activeRegion, activeTag, activeCategory, search, sort]);

  return (
    <div className="bg-surface">
      {/* Hero / wizard */}
      <section className="bg-surface pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Where to next?</h1>
          <p className="mt-3 text-muted-foreground">Pick your vibe and we'll find the perfect package for you.</p>

          <div className="mt-8 flex items-center justify-center gap-2 md:gap-4 text-sm">
            <Step n={1} label="Travel Style" active />
            <span className="w-8 md:w-16 h-px bg-border" />
            <Step n={2} label="Budget" />
            <span className="w-8 md:w-16 h-px bg-border" />
            <Step n={3} label="Who's Going" />
          </div>

          <h2 className="mt-10 text-xl md:text-2xl font-semibold text-foreground">What kind of holiday are you dreaming of?</h2>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
                className={`relative aspect-square rounded-2xl overflow-hidden group ring-2 transition ${activeCategory === c.id ? "ring-primary" : "ring-transparent hover:ring-primary/40"}`}
              >
                <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-3 text-white font-medium text-sm md:text-base drop-shadow">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters bar */}
      <section className="bg-background border-y border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <DropdownButton label="Destination" />
            <DropdownButton label="Experience" />
            <DropdownButton label="Price Range" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
            {(["All", "Local", "International"] as const).map((r) => (
              <Chip key={r} active={activeRegion === r} onClick={() => setActiveRegion(r)}>
                {r === "Local" ? "🇿🇦 Local" : r === "International" ? "🌍 International" : "All"}
              </Chip>
            ))}
            {FILTER_TAGS.map((t) => (
              <Chip key={t} active={activeTag === t} onClick={() => setActiveTag(activeTag === t ? null : t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* TravelBar banner */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> TravelBar
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">Packages are just the beginning.</h2>
            <p className="mt-1 text-white/85">Let our TravelBar experts design your perfect holiday.</p>
          </div>
          <Link to="/contact" className="self-start md:self-auto inline-flex items-center gap-2 bg-background text-primary font-semibold px-5 py-3 rounded-full hover:bg-background/90">
            Plan My Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Listing */}
      <section className="max-w-7xl mx-auto px-4 mt-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-muted-foreground">{filtered.length} packages found · page 1 of 1</p>
          <div className="flex gap-1 text-sm">
            {([
              ["featured", "Featured"],
              ["price", "Best Price"],
              ["deals", "Hot Deals"],
              ["recent", "Recently Added"],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={`px-3 py-1.5 rounded-full ${sort === k ? "bg-accent text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No packages match your filters. <button onClick={() => { setActiveTag(null); setActiveCategory(null); setActiveRegion("All"); setSearch(""); }} className="text-primary underline ml-1">Reset</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full ${active ? "bg-accent text-primary" : "text-muted-foreground"}`}>
      <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{n}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function DropdownButton({ label }: { label: string }) {
  return (
    <button type="button" className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-input bg-background text-sm hover:bg-muted">
      {label} <ChevronDown className="w-4 h-4" />
    </button>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm border transition ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground hover:border-primary/50"}`}
    >
      {children}
    </button>
  );
}
