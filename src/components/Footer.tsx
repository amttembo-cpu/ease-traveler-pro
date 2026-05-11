import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">e</span>
            easetraveler.net
          </div>
          <p className="text-sm text-background/70 leading-relaxed">
            Curated holiday packages for South African travellers. Operated by Ease Travel Solutions.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-background/90">Explore</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-primary">All packages</Link></li>
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-primary">My cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-background/90">Legal</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
            <li><Link to="/refund" className="hover:text-primary">Refund Policy</Link></li>
            <li><Link to="/booking-conditions" className="hover:text-primary">Booking Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-background/90">Contact</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>Agora Village, Thabo Mbeki Road, Lusaka</span></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /><a href="mailto:hello@easetraveler.net" className="hover:text-primary">hello@easetraveler.net</a></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /><span>+260 97 000 0000</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-background/60">
          <p>© {new Date().getFullYear()} Ease Travel Solutions · Reg No 120261043921 · All rights reserved.</p>
          <p>easetraveler.net is a trading name of Ease Travel Solutions.</p>
        </div>
      </div>
    </footer>
  );
}
