import { Link } from "@tanstack/react-router";
import type { Pkg } from "@/lib/packages";
import { formatUSD } from "@/lib/packages";
import { Calendar, MapPin } from "lucide-react";

export function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <Link
      to="/packages/$id"
      params={{ id: pkg.id }}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={pkg.image}
          alt={`${pkg.title} in ${pkg.destination}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-primary/90 text-primary-foreground text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur">
            {pkg.category}
          </span>
          {pkg.tags.includes("Kids Stay Free") && (
            <span className="bg-background/95 text-foreground text-xs px-2.5 py-1 rounded-full font-medium">
              Kids Stay Free
            </span>
          )}
          {pkg.tags.includes("Hot Deal") && (
            <span className="bg-destructive/95 text-destructive-foreground text-xs px-2.5 py-1 rounded-full font-medium">
              Hot Deal
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 bg-background/95 text-foreground text-xs px-3 py-1.5 rounded-full font-medium hover:bg-background"
        >
          Enquire Now
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {pkg.destination}, {pkg.country}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" /> {pkg.validFrom} to {pkg.validTo}
        </p>

        <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">from</p>
            <p className="text-xl font-bold text-foreground">
              {formatUSD(pkg.priceUSD)} <span className="text-xs font-normal text-muted-foreground">pps</span>
            </p>
          </div>
          <span className="text-sm font-medium text-primary group-hover:underline">View Deal →</span>
        </div>
      </div>
    </Link>
  );
}
