import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Home,
  Building2,
  ChefHat,
  Bath,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ContractorSelector from "@/components/ContractorSelector";
import ContactForm from "@/components/ContactForm";
import { locations } from "@/data/contractors";

export const metadata: Metadata = {
  title: "Premium Marble & Tile Contractors | Punjab & Jammu & Kashmir",
  description:
    "Expert marble and tile fitting across Punjab and J&K. Serving Jalandhar, Kapurthala, Ludhiana, Mukerian, and Rajouri. Call your local contractor today for a free quote.",
};

const services = [
  {
    icon: Home,
    title: "Residential Homes",
    description:
      "Elevate every room in your home with precisely fitted marble and decorative tile. From entrance lobbies to master bedrooms.",
    features: [
      "Premium marble flooring",
      "Feature wall installations",
      "Custom pattern inlays",
      "Skirting & border work",
    ],
  },
  {
    icon: Building2,
    title: "Halls & Living Areas",
    description:
      "Make a statement with sweeping marble expanses and bold tile arrangements that define your living spaces.",
    features: [
      "Large-format stone laying",
      "Italian & Indian marble",
      "Bookmatched veneers",
      "Seamless joint finishing",
    ],
  },
  {
    icon: ChefHat,
    title: "Kitchen Fitting",
    description:
      "Kitchen-grade tile and stone solutions that balance beauty with the demands of a busy cooking space.",
    features: [
      "Countertop installation",
      "Splashback tiling",
      "Floor-to-ceiling walls",
      "Heat & stain-resistant options",
    ],
  },
  {
    icon: Bath,
    title: "Bathroom & Wet Rooms",
    description:
      "Transform bathrooms into spa-like sanctuaries with expert wet-area tiling and marble surfaces.",
    features: [
      "Full wet-room systems",
      "Shower enclosures",
      "Mosaic accent walls",
      "Waterproof grouting",
    ],
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "5+", label: "Years of Experience" },
  { value: "5", label: "Cities Covered" },
  { value: "100%", label: "Client Satisfaction" },
];

const whyUs = [
  "Experienced, skilled craftsmen with eye for detail",
  "Premium-grade marble and tile materials sourced directly",
  "Transparent quoting with no hidden charges",
  "On-time project completion guaranteed",
  "Full site cleanup after installation",
  "Post-installation care advice included",
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden marble-bg"
          aria-label="Hero section"
        >
          {/* Decorative veins */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/4 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12 animate-vein" />
            <div className="absolute top-1/3 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-slate-400/15 to-transparent -rotate-6 animate-vein" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-px h-56 bg-gradient-to-b from-transparent via-amber-400/15 to-transparent rotate-45 animate-vein" style={{ animationDelay: "4s" }} />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center pt-20 pb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-sm mb-8">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Punjab & Jammu & Kashmir's Premier Stone Contractors
            </div>

            {/* H1 */}
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="block">Where Stone Meets</span>
              <span className="shimmer-text">Craftsmanship</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Expert marble and tile fitting for homes, halls, kitchens, and bathrooms.
              Serving Jalandhar, Ludhiana, Kapurthala, Mukerian, and Rajouri.
            </p>

            {/* Location CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="tel:+916283969800"
                className="btn-gold text-base px-8 py-4"
                aria-label="Call Jalandhar Hub"
              >
                <Phone className="w-5 h-5" />
                Jalandhar Hub – Call Now
              </a>
              <a
                href="tel:+919876543210"
                className="btn-outline text-base px-8 py-4"
                aria-label="Call Rajouri Hub"
              >
                <Phone className="w-5 h-5" />
                Rajouri Hub – Call Now
              </a>
            </div>

            {/* City quick links */}
            <div className="flex flex-wrap gap-2 justify-center">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                >
                  <MapPin className="w-3 h-3" />
                  {loc.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="border-y border-white/10 bg-white/[0.02]" aria-label="Key statistics">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-playfair text-3xl md:text-4xl font-bold gold-gradient mb-1">{value}</p>
                <p className="text-slate-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section id="services" className="section-pad" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">What We Do</p>
              <h2 id="services-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Installation Services
              </h2>
              <div className="vein-divider" />
              <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                From the grandest entrance hall to the most intimate bathroom, our craftsmen
                deliver flawless marble and tile installations every time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((svc) => (
                <ServiceCard key={svc.title} {...svc} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ───────────────────────────────────────────── */}
        <section className="section-pad bg-white/[0.02] border-y border-white/10" aria-labelledby="why-us-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">Why Choose Us</p>
                <h2 id="why-us-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                  Stone Fitting Done Right — Every Time
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mb-6" />
                <p className="text-slate-400 leading-relaxed mb-8">
                  We don't just lay tiles — we craft surfaces that last decades. Every project gets
                  our full attention, from the first site measurement to the final polish.
                </p>
                <a href="tel:+916283969800" className="btn-gold">
                  <Phone className="w-4 h-4" />
                  Get a Free Quote
                </a>
              </div>
              <ul className="space-y-3">
                {whyUs.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Location Selector ────────────────────────────────── */}
        <section id="locations" className="section-pad" aria-labelledby="locations-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">Service Areas</p>
              <h2 id="locations-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                Find Your Local Contractor
              </h2>
              <div className="vein-divider" />
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                We operate two regional hubs covering Punjab and Jammu & Kashmir.
                Pick your city to connect directly with your nearest contractor.
              </p>
            </div>

            <ContractorSelector />
          </div>
        </section>

        {/* ── SEO Content ──────────────────────────────────────── */}
        <section className="section-pad bg-white/[0.02] border-y border-white/10" aria-labelledby="seo-content-heading">
          <div className="max-w-4xl mx-auto prose-invert">
            <h2 id="seo-content-heading" className="font-playfair text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Expert Marble & Tile Contractors Across Punjab and J&K
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-400 text-sm leading-relaxed">
              <div>
                <h3 className="text-white font-semibold text-base mb-2">Our Punjab Coverage</h3>
                <p>
                  With our Jalandhar Hub operated by Mr. Vikash, we deliver top-quality marble and tile
                  installation across Jalandhar City, Kapurthala, Mukerian, and Ludhiana. Whether you're
                  renovating a family home or fitting out a commercial hall, our Punjab team brings
                  precision and speed to every project.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">Our J&K Coverage</h3>
                <p>
                  The Rajouri Hub, led by Mr. SK Kumar, serves Rajouri and the wider Jammu & Kashmir
                  region. From traditional stone work to modern large-format tiles, we bring premium
                  fitting skills to the hills of J&K, handling everything from small bathrooms to
                  sprawling residential halls.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">Types of Marble We Install</h3>
                <p>
                  Our contractors work with a full spectrum of natural and engineered stone: Italian
                  Statuario, Makrana White, Black Galaxy Granite, Rajasthan Marble, and premium vitrified
                  tiles. We help you select the right material for your space, budget, and lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-2">Transparent Pricing Policy</h3>
                <p>
                  We believe in honest, upfront pricing. When you call, our contractor will arrange a
                  free site visit, measure your space, and provide a detailed quote covering all labour
                  and materials — no surprises when the invoice arrives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Location Pages CTA ───────────────────────────────── */}
        <section className="section-pad" aria-labelledby="city-pages-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="city-pages-heading" className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
                Browse by City
              </h2>
              <p className="text-slate-400 text-sm">City-specific pages with local contractor details and relevant service information.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="glass-card p-5 hover:border-amber-400/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="text-white font-semibold">{loc.city}</span>
                      </div>
                      <p className="text-slate-500 text-xs ml-6">{loc.state}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="section-pad bg-white/[0.02] border-t border-white/10" aria-labelledby="contact-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 id="contact-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h2>
              <div className="vein-divider" />
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Call or WhatsApp your local contractor. We'll arrange a free site visit and give you
                a detailed, no-obligation quote.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
