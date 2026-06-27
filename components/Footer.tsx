import Link from "next/link";
import { Phone, MessageCircle, MapPin, Diamond } from "lucide-react";
import { locations } from "@/data/contractors";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Diamond className="w-4 h-4 text-slate-950" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-white">Premium Marble</span>
                <span className="block text-[10px] text-amber-400 tracking-widest uppercase">& Tile Contractors</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Precision marble and tile fitting for homes, halls, kitchens, and bathrooms across Punjab and Jammu & Kashmir.
            </p>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Service Areas</h3>
            <ul className="space-y-2">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="text-slate-400 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors group"
                  >
                    <MapPin className="w-3 h-3 group-hover:text-amber-400" />
                    {loc.city}, {loc.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4">
              {[
                { hub: "Jalandhar Hub", contractor: locations[0].contractor },
                { hub: "Rajouri Hub", contractor: locations[4].contractor },
              ].map(({ hub, contractor }) => (
                <div key={hub}>
                  <p className="text-amber-400 text-xs uppercase tracking-wider mb-1">{hub}</p>
                  <p className="text-slate-300 text-sm mb-1">{contractor.name}</p>
                  <div className="flex gap-3">
                    <a
                      href={`tel:${contractor.phone}`}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors"
                      aria-label={`Call ${contractor.name}`}
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${contractor.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-green-400 flex items-center gap-1 text-xs transition-colors"
                      aria-label={`WhatsApp ${contractor.name}`}
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <p>© {year} Premium Marble & Tile Contractors. All rights reserved.</p>
          <p>Punjab & Jammu & Kashmir, India</p>
        </div>
      </div>
    </footer>
  );
}
