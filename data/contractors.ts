export type Region = "jalandhar" | "kapurthala" | "mukerian" | "ludhiana" | "rajouri";

export interface Contractor {
  name: string;
  phone: string;
  whatsapp: string;
  title: string;
}

export interface LocationData {
  slug: Region;
  city: string;
  state: string;
  hub: string;
  contractor: Contractor;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  nearbyAreas: string[];
  ogImage: string;
}

export const contractors: Record<string, Contractor> = {
  vikash: {
    name: "Mr. Vikash Kumar",
    phone: "+916283969898",
    whatsapp: "916283969898",
    title: "Lead Contractor – Jalandhar Hub",
  },
  sk_kumar: {
    name: "Mr. Sanjay Kumar",
    phone: "+919596998917",
    whatsapp: "919596998917",
    title: "Lead Contractor – Rajouri Hub",
  },
};

export const locations: LocationData[] = [
  {
    slug: "jalandhar",
    city: "Jalandhar",
    state: "Punjab",
    hub: "Jalandhar Hub",
    contractor: contractors.vikash,
    tagline: "Premium Marble & Tile Installation in Jalandhar",
    description:
      "Serving Jalandhar City and surrounding areas with top-tier marble and tile fitting for homes, halls, kitchens, and bathrooms.",
    seoTitle: "Best Marble & Tile Contractor in Jalandhar | Premium Marble Fitting",
    seoDescription:
      "Looking for expert marble and tile fitting in Jalandhar? We offer premium installation for homes, halls, kitchens & bathrooms. Call now for a free quote.",
    keywords: [
      "marble contractor jalandhar",
      "tile fitting jalandhar",
      "marble installation jalandhar",
      "tile contractor jalandhar",
      "bathroom tile jalandhar",
      "kitchen marble jalandhar",
      "best marble contractor service in jalandhar",
    ],
    nearbyAreas: ["Kapurthala", "Mukerian", "Ludhiana", "Phagwara", "Hoshiarpur"],
    ogImage: "/og/jalandhar.jpg",
  },
  {
    slug: "kapurthala",
    city: "Kapurthala",
    state: "Punjab",
    hub: "Jalandhar Hub",
    contractor: contractors.vikash,
    tagline: "Expert Marble & Tile Services in Kapurthala",
    description:
      "Kapurthala's trusted marble and tile contractor. We transform homes, halls, kitchens, and bathrooms with premium stone installations.",
    seoTitle: "Marble & Tile Contractor in Kapurthala | Premium Stone Fitting",
    seoDescription:
      "Expert marble and tile fitting in Kapurthala. Serving homes, halls, kitchens & bathrooms. Contact our local contractor for a free consultation.",
    keywords: [
      "marble contractor kapurthala",
      "tile fitting kapurthala",
      "marble installation kapurthala",
      "tile contractor kapurthala",
      "best marble service kapurthala",
    ],
    nearbyAreas: ["Jalandhar", "Phagwara", "Sultanpur Lodhi", "Nakodar"],
    ogImage: "/og/kapurthala.jpg",
  },
  {
    slug: "mukerian",
    city: "Mukerian",
    state: "Punjab",
    hub: "Jalandhar Hub",
    contractor: contractors.vikash,
    tagline: "Marble & Tile Fitting Experts in Mukerian",
    description:
      "Premium marble and tile installations in Mukerian. Our skilled contractors handle everything from floors to walls for any room.",
    seoTitle: "Marble & Tile Contractor in Mukerian | Expert Fitting Services",
    seoDescription:
      "Find the best marble and tile fitting in Mukerian. Quality stone installation for homes, halls, kitchens & bathrooms. Call for a free quote.",
    keywords: [
      "marble contractor mukerian",
      "tile fitting mukerian",
      "marble installation mukerian",
      "tile contractor mukerian",
      "best tile service mukerian",
    ],
    nearbyAreas: ["Hoshiarpur", "Dasuya", "Tanda", "Jalandhar"],
    ogImage: "/og/mukerian.jpg",
  },
  {
    slug: "ludhiana",
    city: "Ludhiana",
    state: "Punjab",
    hub: "Jalandhar Hub",
    contractor: contractors.vikash,
    tagline: "Luxury Marble & Tile Installation in Ludhiana",
    description:
      "Bringing premium marble and tile craftsmanship to Ludhiana. Specialists in residential and commercial stone fitting.",
    seoTitle: "Best Marble & Tile Contractor in Ludhiana | Luxury Stone Fitting",
    seoDescription:
      "Premium marble and tile fitting in Ludhiana for homes, halls, kitchens & bathrooms. Trusted contractors with years of experience. Get a free quote today.",
    keywords: [
      "marble contractor ludhiana",
      "tile fitting ludhiana",
      "marble installation ludhiana",
      "best marble contractor ludhiana",
      "bathroom marble ludhiana",
      "kitchen tile ludhiana",
    ],
    nearbyAreas: ["Khanna", "Fatehgarh Sahib", "Moga", "Jagraon", "Jalandhar"],
    ogImage: "/og/ludhiana.jpg",
  },
  {
    slug: "rajouri",
    city: "Rajouri",
    state: "Jammu & Kashmir",
    hub: "Rajouri Hub",
    contractor: contractors.sk_kumar,
    tagline: "Premium Marble & Tile Contractors in Rajouri",
    description:
      "Rajouri's leading marble and tile fitting service. We cover Rajouri, Jammu & Kashmir and nearby regions with expert stone installations.",
    seoTitle: "Marble & Tile Contractor in Rajouri J&K | Expert Stone Fitting",
    seoDescription:
      "Top-rated marble and tile fitting services in Rajouri, J&K. Expert contractors for homes, halls, kitchens & bathrooms. Call for a free site visit.",
    keywords: [
      "marble contractor rajouri",
      "tile fitting rajouri",
      "marble installation rajouri jammu kashmir",
      "tile contractor rajouri jk",
      "best marble service rajouri",
      "tile fitting services in rajouri",
    ],
    nearbyAreas: ["Nowshera", "Sunderbani", "Kandi", "Jammu", "Pir Panjal"],
    ogImage: "/og/rajouri.jpg",
  },
];

export const locationMap: Record<string, LocationData> = Object.fromEntries(
  locations.map((l) => [l.slug, l])
);

export const allSlugs = locations.map((l) => l.slug);
