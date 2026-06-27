"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Diamond } from "lucide-react";
import { locations } from "@/data/contractors";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
            <Diamond className="w-4 h-4 text-slate-950" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-white">Premium Marble</span>
            <span className="block text-[10px] text-amber-400 tracking-widest uppercase">& Tile Contractors</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-sm text-slate-400 hover:text-white transition-colors">Services</Link>
          <Link href="/#locations" className="text-sm text-slate-400 hover:text-white transition-colors">Locations</Link>
          <Link href="/#contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+916283969800"
            className="btn-gold text-sm py-2 px-4"
            aria-label="Call us now"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/#services" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/#locations" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Locations</Link>
            <Link href="/#contact" className="text-slate-300 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              {locations.slice(0, 2).map((loc) => (
                <a
                  key={loc.slug}
                  href={`tel:${loc.contractor.phone}`}
                  className="btn-gold justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Call {loc.hub}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
