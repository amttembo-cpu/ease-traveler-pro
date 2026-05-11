import { Link } from "@tanstack/react-router";
import { Mail, HelpCircle, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  const navLinks = [
    { to: "/", label: "Packages" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">e</span>
          <span>easetraveler<span className="text-primary">.net</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary border-b-2 border-primary" }}
              className="py-2 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 text-sm">
          <Link to="/cart" className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">{count}</span>
            )}
          </Link>
          <Link to="/contact" className="hidden md:inline-flex items-center gap-1.5 text-foreground/70 hover:text-primary"><Mail className="w-4 h-4" /></Link>
          <Link to="/contact" className="hidden md:inline-flex items-center gap-1.5 text-foreground/70 hover:text-primary"><HelpCircle className="w-4 h-4" />Help</Link>
          <Link to="/contact" className="hidden md:inline-flex items-center gap-1.5 text-foreground/70 hover:text-primary"><User className="w-4 h-4" />My Account</Link>
        </div>
      </div>
    </header>
  );
}
