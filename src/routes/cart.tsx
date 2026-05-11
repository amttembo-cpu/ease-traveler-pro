import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatUSD } from "@/lib/packages";
import { Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — easetraveler.net" },
      { name: "description", content: "Review your selected holiday packages and proceed to secure card checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setTravelers, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our curated packages and add a holiday to get started.</p>
        <Link to="/" className="mt-6 inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-dark">
          Browse packages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Your cart</h1>
      <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? "package" : "packages"}</p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ pkg, travelers }) => (
            <div key={pkg.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4">
              <img src={pkg.image} alt={pkg.title} className="w-32 h-32 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to="/packages/$id" params={{ id: pkg.id }} className="font-semibold text-foreground hover:text-primary line-clamp-1">{pkg.title}</Link>
                <p className="text-sm text-muted-foreground">{pkg.destination}, {pkg.country}</p>
                <p className="text-sm text-muted-foreground">{pkg.nights} nights · {formatUSD(pkg.priceUSD)} pps</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Travellers</span>
                    <button onClick={() => setTravelers(pkg.id, travelers - 1)} className="w-7 h-7 rounded-full border border-border hover:bg-muted">−</button>
                    <span className="w-6 text-center text-sm font-medium">{travelers}</span>
                    <button onClick={() => setTravelers(pkg.id, travelers + 1)} className="w-7 h-7 rounded-full border border-border hover:bg-muted">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">{formatUSD(pkg.priceUSD * travelers)}</span>
                    <button onClick={() => remove(pkg.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside>
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-lg text-foreground">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatUSD(total)} />
              <Row label="Booking fee" value={formatUSD(450)} />
              <Row label="Taxes & levies" value="Included" />
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold text-foreground">
              <span>Total due today</span>
              <span>{formatUSD(total + 450)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block text-center w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full hover:bg-primary-dark">
              Proceed to checkout
            </Link>
            <p className="mt-3 text-xs text-muted-foreground text-center">Secure card payment · 256-bit SSL</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
