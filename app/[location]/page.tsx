import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  User,
  Home,
  Building2,
  ChefHat,
  Bath,
  CheckCircle2,
  ArrowLeft,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { locationMap, allSlugs, locations } from "@/data/contractors";

interface Props {
  params: { location: string };
}

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ location: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = locationMap[params.location];
  if (!loc) return {};

  return {
    title: loc.seoTitle,
    description: loc.seoDescription,
    keywords: loc.keywords,
    alternates: {
      canonical: `https://premiummarblecontractors.in/${loc.slug}`,
    },
    openGraph: {
      title: loc.seoTitle,
      description: loc.seoDescription,
      url: `https://premiummarblecontractors.in/${loc.slug}`,
      siteName: "Premium Marble & Tile Contractors",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: loc.seoTitle,
      description: loc.seoDescription,
    },
  };
}

function buildJsonLd(params: { location: string }) {
  const loc = locationMap[params.location];
  if (!loc) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `Premium Marble & Tile Contractors – ${loc.city}`,
    description: loc.description,
    url: `https://premiummarblecontractors.in/${loc.slug}`,
    telephone: loc.contractor.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: loc.contractor.phone,
      contactType: "customer service",
      areaServed: loc.city,
      availableLanguage: ["en", "hi", "pa"],
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        name: loc.city,
        addressRegion: loc.state,
        addressCountry: "IN",
      },
      geoRadius: "60000",
    },
    serviceArea: [loc.city, ...loc.nearbyAreas].map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marble & Tile Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marble Flooring Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tile Fitting Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen Tile Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Tile Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hall Marble Installation" } },
      ],
    },
    employee: {
      "@type": "Person",
      name: loc.contractor.name,
      jobTitle: loc.contractor.title,
      telephone: loc.contractor.phone,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
  };
}

const serviceItems = [
  { icon: Home, title: "Home Marble Fitting", desc: "Complete marble and tile solutions for every room in your home." },
  { icon: Building2, title: "Hall & Living Area", desc: "Grand marble expanses and feature tile installations for living spaces." },
  { icon: ChefHat, title: "Kitchen Tiling", desc: "Durable, beautiful tile fitting for countertops, floors, and splashbacks." },
  { icon: Bath, title: "Bathroom Tiling", desc: "Spa-grade marble and tile work for wet rooms and bathrooms." },
];

const processSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Reach your local contractor directly. No offices, no waiting — just a direct call." },
  { step: "02", title: "Free Site Visit", desc: "We visit your location, measure the area, and assess the scope of work." },
  { step: "03", title: "Transparent Quote", desc: "Receive a detailed, itemised quote covering materials and labour — no hidden costs." },
  { step: "04", title: "Expert Installation", desc: "Our skilled team installs your marble or tile with precision and care." },
];

export default function LocationPage({ params }: Props) {
  const loc = locationMap[params.location];
  if (!loc) notFound();

  const jsonLd = buildJsonLd(params);
  const otherLocations = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative min-h-[70vh] flex items-center overflow-hidden marble-bg pt-20"
          aria-label={`Hero for ${loc.city}`}
        >
          {/* Decorative */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 right-1/4 w-px h-56 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12 animate-vein" />
            <div className="absolute bottom-1/3 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-slate-400/15 to-transparent -rotate-6 animate-vein" style={{ animationDelay: "3s" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-16">
            {/* Breadcrumb */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Locations
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-sm mb-6">
              <MapPin className="w-3.5 h-3.5" />
              {loc.city}, {loc.state}
            </div>

            {/* H1 — unique per city */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              <span className="shimmer-text">Marble & Tile</span>
              <br />
              <span>Contractors in {loc.city}</span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-10">
              {loc.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`tel:${loc.contractor.phone}`}
                className="btn-gold text-base px-8 py-4"
                aria-label={`Call ${loc.contractor.name} for ${loc.city}`}
              >
                <Phone className="w-5 h-5" />
                Call {loc.contractor.name}
              </a>
              <a
                href={`https://wa.me/${loc.contractor.whatsapp}?text=Hi%2C%20I%20need%20marble%20and%20tile%20fitting%20services%20in%20${encodeURIComponent(loc.city)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all"
                aria-label={`WhatsApp ${loc.contractor.name}`}
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">WhatsApp Us</span>
              </a>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-slate-400 text-sm ml-1">4.9/5 from 47+ reviews</span>
            </div>
          </div>
        </section>

        {/* ── Contractor Profile ───────────────────────────────── */}
        <section className="border-y border-white/10 bg-white/[0.02]" aria-label="Contractor profile">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
            <div className="glass-card p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-xl shadow-amber-500/30">
                    <User className="w-8 h-8 text-slate-950" />
                  </div>
                  <div>
                    <p className="text-amber-400 text-xs uppercase tracking-wider mb-1">Your Local Contractor</p>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-0.5">{loc.contractor.name}</h2>
                    <p className="text-slate-400 text-sm">{loc.contractor.title}</p>
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {loc.hub} — covering {loc.city} & surrounding areas
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Coverage Areas</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
                      {loc.city} ✓ Primary
                    </span>
                    {loc.nearbyAreas.map((area) => (
                      <span key={area} className="px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={`tel:${loc.contractor.phone}`} className="btn-gold py-2.5 px-4 text-sm">
                      <Phone className="w-3.5 h-3.5" /> Call Now
                    </a>
                    <a
                      href={`https://wa.me/${loc.contractor.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all text-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section className="section-pad" aria-labelledby="city-services-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">Services</p>
              <h2 id="city-services-heading" className="font-playfair text-3xl font-bold text-white mb-4">
                Marble & Tile Services in {loc.city}
              </h2>
              <div className="vein-divider" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {serviceItems.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="glass-card p-6 flex gap-4 hover:border-amber-400/30 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/20 transition-colors">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-slate-400 text-sm">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section className="section-pad bg-white/[0.02] border-y border-white/10" aria-labelledby="process-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">How It Works</p>
              <h2 id="process-heading" className="font-playfair text-3xl font-bold text-white mb-4">
                From First Call to Final Finish
              </h2>
              <div className="vein-divider" />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {processSteps.map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-playfair text-amber-400 font-bold text-sm">{step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEO content block ─────────────────────────────────── */}
        <section className="section-pad" aria-labelledby="city-content-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="city-content-heading" className="font-playfair text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Why We're the Best Marble & Tile Contractors in {loc.city}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-400 text-sm leading-relaxed">
              <div>
                <h3 className="text-white font-semibold mb-2 text-base">Local Knowledge, Premium Results</h3>
                <p>
                  We understand the {loc.city} market — local building styles, popular marble
                  choices, and the climate considerations that affect stone longevity. Our team brings
                  this regional expertise to every project, ensuring your installation stands the test
                  of time.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-base">No Middlemen, Direct Service</h3>
                <p>
                  When you call us, you speak directly to {loc.contractor.name} — your local lead
                  contractor. No call centres, no hand-offs. You get honest answers, fair pricing, and
                  a direct line to the person doing the work.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-base">Full Range of Stone & Tile</h3>
                <p>
                  From Makrana White marble and Italian Statuario to premium vitrified tiles and
                  designer mosaics — we source and install the full range. We'll help you pick the
                  right material for your space, budget, and long-term maintenance preferences.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-base">Covering {loc.city} & Nearby</h3>
                <p>
                  Based in the {loc.hub}, we serve {loc.city} and extend to{" "}
                  {loc.nearbyAreas.join(", ")}. Long-distance projects within range are handled at
                  no extra travel charge — just call to confirm coverage.
                </p>
              </div>
            </div>

            {/* Benefits list */}
            <div className="mt-10 glass-card p-6 md:p-8">
              <h3 className="text-white font-semibold text-base mb-5">What You Get With Every Project</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Free site measurement and assessment",
                  "Itemised, no-hidden-cost quote",
                  "Premium materials at contractor rates",
                  "Skilled, experienced fitting team",
                  "Clean site handed back after completion",
                  "Post-installation care guidance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="section-pad bg-white/[0.02] border-t border-white/10" aria-labelledby="city-contact-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-3">Contact</p>
              <h2 id="city-contact-heading" className="font-playfair text-3xl font-bold text-white mb-4">
                Get a Free Quote in {loc.city}
              </h2>
              <div className="vein-divider" />
            </div>
            <ContactForm />
          </div>
        </section>

        {/* ── Other Locations ──────────────────────────────────── */}
        <section className="section-pad border-t border-white/10" aria-label="Other service locations">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-xl font-bold text-white mb-6 text-center">
              We Also Serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherLocations.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${other.slug}`}
                  className="glass-card p-4 text-center hover:border-amber-400/30 hover:-translate-y-0.5 transition-all group"
                >
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-amber-400 mx-auto mb-1.5 transition-colors" />
                  <p className="text-white text-sm font-medium group-hover:text-amber-300 transition-colors">{other.city}</p>
                  <p className="text-slate-500 text-xs">{other.state}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
