"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, User, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { locations, LocationData } from "@/data/contractors";

export default function ContractorSelector() {
  const [selected, setSelected] = useState<LocationData | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* City picker */}
      <div>
        <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Select your city</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {locations.map((loc) => (
            <button
              key={loc.slug}
              onClick={() => setSelected(loc)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 group ${
                selected?.slug === loc.slug
                  ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/20"
                  : "border-white/10 bg-white/5 hover:border-amber-400/40 hover:bg-white/10"
              }`}
              aria-pressed={selected?.slug === loc.slug}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <MapPin className={`w-3.5 h-3.5 ${selected?.slug === loc.slug ? "text-amber-400" : "text-slate-500 group-hover:text-amber-400"}`} />
                    <span className={`font-semibold text-sm ${selected?.slug === loc.slug ? "text-amber-300" : "text-white"}`}>
                      {loc.city}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 ml-5.5">{loc.state}</span>
                </div>
                {selected?.slug === loc.slug ? (
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contractor reveal */}
      <div>
        {selected ? (
          <div className="glass-card p-6 md:p-8 border-amber-400/20 shadow-xl shadow-amber-500/10 animate-[fade-up_0.4s_ease_forwards]">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                <User className="w-7 h-7 text-slate-950" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{selected.contractor.name}</h3>
                <p className="text-amber-400 text-sm">{selected.contractor.title}</p>
                <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Serving {selected.city} & nearby areas
                </p>
              </div>
            </div>

            {/* Coverage */}
            <div className="mb-6">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Also covers</p>
              <div className="flex flex-wrap gap-2">
                {selected.nearbyAreas.map((area) => (
                  <span key={area} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${selected.contractor.phone}`}
                className="btn-gold flex-1 justify-center"
                aria-label={`Call ${selected.contractor.name}`}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${selected.contractor.whatsapp}?text=Hi%2C%20I%20need%20marble%20and%20tile%20fitting%20services%20in%20${encodeURIComponent(selected.city)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60 transition-all duration-200"
                aria-label={`WhatsApp ${selected.contractor.name}`}
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">WhatsApp</span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <Link
                href={`/${selected.slug}`}
                className="text-amber-400 text-sm hover:text-amber-300 transition-colors underline underline-offset-2"
              >
                View {selected.city} services page →
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center h-64">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm">Select your city to find<br />your local contractor</p>
          </div>
        )}
      </div>
    </div>
  );
}
