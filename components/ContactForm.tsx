"use client";

import { useState } from "react";
import { Phone, MessageCircle, Send } from "lucide-react";
import { locations } from "@/data/contractors";

export default function ContactForm() {
  const [city, setCity] = useState(locations[0].slug);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const selectedLocation = locations.find((l) => l.slug === city) ?? locations[0];

  const handleWhatsApp = () => {
    const text = `Hi ${selectedLocation.contractor.name}, I'm ${name || "interested"} and need marble/tile services in ${selectedLocation.city}. ${message}`;
    window.open(`https://wa.me/${selectedLocation.contractor.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${selectedLocation.contractor.phone}`;
  };

  return (
    <div className="glass-card p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h3 className="font-playfair text-2xl font-semibold text-white mb-2">Get a Free Quote</h3>
        <p className="text-slate-400 text-sm">Fill in your details and connect directly with your local contractor.</p>
      </div>

      <div className="space-y-4">
        {/* City select */}
        <div>
          <label htmlFor="city-select" className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">
            Your City
          </label>
          <select
            id="city-select"
            value={city}
            onChange={(e) => setCity(e.target.value as any)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-400/60 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc.slug} value={loc.slug}>
                {loc.city} – {loc.state}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. Rajesh Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-amber-400/60 focus:outline-none transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">
            Project Details (Optional)
          </label>
          <textarea
            id="contact-message"
            placeholder="e.g. Need marble flooring for 3BHK, approximately 1200 sq ft kitchen and hall..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-amber-400/60 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Contractor preview */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-amber-300 text-sm font-semibold">{selectedLocation.contractor.name}</p>
            <p className="text-slate-400 text-xs">Your local contractor for {selectedLocation.city}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCall}
            className="btn-gold flex-1 justify-center"
            aria-label={`Call ${selectedLocation.contractor.name}`}
          >
            <Phone className="w-4 h-4" />
            Call {selectedLocation.contractor.name}
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60 transition-all duration-200"
            aria-label={`WhatsApp ${selectedLocation.contractor.name}`}
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400">Send via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
