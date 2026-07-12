"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { locations } from "@/data/contractors";

type Status = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string[];
  phone?: string[];
  city?: string[];
  message?: string[];
}

export default function ContactForm() {
  const [city, setCity] = useState(locations[0].slug);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");
  const [successContractor, setSuccessContractor] = useState<{
    name: string;
    phone: string;
    whatsapp: string;
  } | null>(null);

  const selectedLocation =
    locations.find((l) => l.slug === city) ?? locations[0];

  const resetErrors = () => {
    setFieldErrors({});
    setApiError("");
  };

  const handleSubmit = async () => {
    resetErrors();

    if (!name.trim()) {
      setFieldErrors({ name: ["Name is required"] });
      return;
    }

    setStatus("loading");

    const urlParams = new URLSearchParams(window.location.search);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim().replace(/\D/g, "").slice(-10),
          city,
          message: message.trim(),
          pageUrl: window.location.href,
          utmSource: urlParams.get("utm_source") ?? undefined,
          utmMedium: urlParams.get("utm_medium") ?? undefined,
          utmCampaign: urlParams.get("utm_campaign") ?? undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.fields) {
          setFieldErrors(json.fields);
          setStatus("idle");
        } else {
          setApiError(json.error ?? "Something went wrong.");
          setStatus("error");
        }
        return;
      }

      setSuccessContractor(json.contractor);
      setStatus("success");
    } catch {
      setApiError("Network error. Please call us directly.");
      setStatus("error");
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi ${selectedLocation.contractor.name}, I'm ${name || "interested"} and need marble/tile services in ${selectedLocation.city}. ${message}`;
    window.open(
      `https://wa.me/${selectedLocation.contractor.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${selectedLocation.contractor.phone}`;
  };

  // ── Success state ─────────────────────────────────────────
  if (status === "success" && successContractor) {
    return (
      <div className="glass-card p-6 md:p-10 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-white mb-2">
          Enquiry Received!
        </h3>
        <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
          Your details have been saved. {successContractor.name} will contact
          you shortly. Need an immediate response? Reach out directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${successContractor.phone}`}
            className="btn-gold justify-center"
          >
            <Phone className="w-4 h-4" />
            Call {successContractor.name}
          </a>
          <a
            href={`https://wa.me/${successContractor.whatsapp}?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20on%20your%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400">WhatsApp</span>
          </a>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setName("");
            setPhone("");
            setMessage("");
            setSuccessContractor(null);
          }}
          className="mt-6 text-slate-500 hover:text-slate-300 text-sm transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <div className="glass-card p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
          Get a Free Quote
        </h3>
        <p className="text-slate-400 text-sm">
          We save your details and have your local contractor call you back.
        </p>
      </div>

      <div className="space-y-4">
        {/* City */}
        <div>
          <label
            htmlFor="city-select"
            className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Your City <span className="text-amber-400">*</span>
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
          <label
            htmlFor="contact-name"
            className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Your Name <span className="text-amber-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. Rajesh Sharma"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              resetErrors();
            }}
            className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
              fieldErrors.name
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-amber-400/60"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Mobile Number{" "}
            <span className="text-slate-600 normal-case tracking-normal">
              (so we can call you back)
            </span>
          </label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-white/10 bg-slate-800 text-slate-400 text-sm select-none">
              +91
            </span>
            <input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ""));
                resetErrors();
              }}
              className={`flex-1 bg-slate-900 border rounded-r-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                fieldErrors.phone
                  ? "border-red-500/60"
                  : "border-white/10 focus:border-amber-400/60"
              }`}
            />
          </div>
          {fieldErrors.phone && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.phone[0]}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Project Details{" "}
            <span className="text-slate-600 normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <textarea
            id="contact-message"
            placeholder="e.g. Need marble flooring for 3BHK, approximately 1200 sq ft kitchen and hall..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={1000}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-amber-400/60 focus:outline-none transition-colors resize-none"
          />
          <p className="text-slate-600 text-xs mt-1 text-right">
            {message.length}/1000
          </p>
        </div>

        {/* Contractor preview */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-amber-300 text-sm font-semibold">
              {selectedLocation.contractor.name}
            </p>
            <p className="text-slate-400 text-xs">
              Will handle your {selectedLocation.city} enquiry
            </p>
          </div>
        </div>

        {/* API error banner */}
        {status === "error" && apiError && (
          <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{apiError}</p>
          </div>
        )}

        {/* Primary submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full btn-gold justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending enquiry…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Enquiry & Get Callback
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-slate-500 text-xs">or contact directly</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Direct contact */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCall}
            className="btn-outline flex-1 justify-center py-3"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold">WhatsApp</span>
          </button>
        </div>

        <p className="text-slate-600 text-xs text-center">
          Your details are saved securely and only shared with your local
          contractor.
        </p>
      </div>
    </div>
  );
}
