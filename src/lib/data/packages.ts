import { PackageType } from "@/Components/PackageCard";

export const allPackages: PackageType[] = [
  // PROPOSAL
  // {
  //   name: "Proposal Platinum",
  //   price: 1800000,
  //   description: "Full planning assistance and drone footage.",
  //   features: [
  //     "2 Photographers",
  //     "Drone footage",
  //     "Full proposal video",
  //     "120+ photos",
  //     "Same‑day preview",
  //   ],
  //   image: "/images/packages/Proposal/proposal-platinum.jpg",
  //   category: "proposal",
  // },
  // {
  //   name: "Proposal Gold",
  //   price: 1200000,
  //   description: "Photos + a short cinematic teaser.",
  //   features: [
  //     "1 Photographer",
  //     "1 Videographer",
  //     "90+ edited photos",
  //     "30‑sec teaser",
  //     "Online gallery",
  //   ],
  //   image: "/images/packages/Proposal/proposal-gold.jpg",
  //   category: "proposal",
  // },
  // {
  //   name: "Proposal Silver",
  //   price: 800000,
  //   description: "Discreet coverage of the big moment.",
  //   features: [
  //     "1 Photographer",
  //     "60+ edited photos",
  //     "Online gallery",
  //     "Print release",
  //   ],
  //   image: "/images/packages/Proposal/proposal-silver.jpg",
  //   category: "proposal",
  // },

  // KUKYALA
  {
    name: "Kukyaala Platinum",
    price: 2500000,
    description:
      "Planning a Slightly Bigger Kukyaala? Full Coverage of Event.",
    features: [
      "Everything in Gold Package",
      "250+ Photos in an A3 Luxury book",
      "3 Beautiful Boards (1A2, 2A3's)",
      "Your Kukyala Day Vlog",
      "Beautiful Short Video + Full Video",
    ],
    image: "/images/packages/Kukyaala/kukyaala-platinum.jpg",
    category: "kukyaala",
  },
  {
    name: "Kukyaala Gold",
    price: 1800000,
    description:
      "This is our Most Popular Package. If Your Attention is on Both Photos & Video.",
    features: [
      "Everything in Silver Package",
      "200+ Photos in a Photobook",
      "1 Videographer",
      "Beautiful Short Video",
      "6 Months Files Back up",
    ],
    image: "/images/packages/Kukyaala/kukyaala-gold.jpg",
    category: "kukyaala",
    popular: true,
  },
  {
    name: "Kukyaala Silver",
    price: 1200000,
    description:
      "This is our standard Photography Only Package. If Your Attention is on Photos only.",
    features: [
      "1 Photographer",
      "150+ Photos in a Photobook",
      "2 Photo Boards (1A2, 1A3)",
      "4 Months BackUp",
    ],
    image: "/images/packages/Kukyaala/kukyaala-silver.jpg",
    category: "kukyaala",
  },

  // KWANJULA / KUHINGIRA
  {
    name: "Kwanjula Platinum",
    price: 7500000,
    description:
      "Unlock the World with this Combo, this Package suits a big Kwanjula.",
    features: [
      "2 Photographers",
      "3 Videographers",
      "400+ Photos in Two Luxury Photobooks",
      "2 Luxury Couple Frame Photos",
      "In Door Mugole Display Tv",
      "6 Photo Boards (2A2's 4A3's)",
      "(2) 50\" Outdoor TVs",
      "Your Kwanjula Day Vlog",
      "External Drive With All Work",
      "Full Event Video (Two 64GB Drives)",
    ],
    image: "/images/packages/Kwanjula/kwanjula-platinum.jpg",
    category: "kuhingira",
  },
  {
    name: "Kwanjula Gold",
    price: 4500000,
    description:
      "You get extra services with this Combo, This Happens to be the Most Popular.",
    features: [
      "2 Videographers",
      "2 Photographers",
      "300+ Photos in a Kwanjula photobook",
      "4 Luxury Photo Boards (2A2's 2A3's)",
      "Full Day Drone Services",
      "Beautiful Social Media Reels",
      "Beautiful Highlight Video",
      "Full Event Video (Two 64GB Drives)",
      "1 Year Files Back Up",
    ],
    image: "/images/packages/Kwanjula/kwanjula-gold.jpg",
    category: "kuhingira",
    popular: true,
  },
    {
    name: "Kwanjula Silver",
    price: 3200000,
    description:
      "This is our standard combo, Get extra Special Attention When you Book with us.",
    features: [
      "1 Main photographer & An assistant",
      "2 Videographers",
      "250+ Photos in a Photobook",
      "3 Photo Boards (1A2, 2A3's)",
      "Beautiful Short Video",
      "Full Event Video (64GB Flash Drive)",
      "6 Month Back Up",
    ],
    image: "/images/packages/Kwanjula/kwanjula-silver.jpg",
    category: "kuhingira",
  },

  // WEDDING
  {
    name: "Wedding Platinum",
    price: 7200000,
    description:
      "Unlock the World with this Combo, this Package suits a big Wedding. Book Now!",
    features: [
      "Everything in Gold Package",
      "3 Videographers",
      "450+ Edited Photos",
      "2 Luxury Couple Frames",
      "Love Story & Memory Lane Videos",
      "6 Beautiful Boards (2A2's , 4A3's)",
      "(2) 50\" Live Feed TVs",
      "2 Luxury Square Bridal Photobooks",
      "External Drive With All Work",
      "Your Wedding Day Vlog (New)",
      "Private Online Photo Gallery",
    ],
    image: "/images/packages/Wedding/wedding-platinum.jpg",
    category: "wedding",
  },
  {
    name: "Wedding Gold",
    price: 5200000,
    description:
      "You get extra services with this Combo, This Happens to be the Most Popular.",
    features: [
      "2 Main Photographers",
      "Pre Wedding Photoshoot (Within CBD)",
      "300+ Photos in a Luxury Bridal book",
      "4 Photo Boards (2A2's ,2A3's)",
      "1 Luxury Couple Frame Photos",
      "Full Day Drone Services",
      "Beautiful Social Media Reels",
      "Beautiful Highlight Video",
      "Full Event Video (Two 64GB Drives)",
      "1 Year Files Back Up",
    ],
    image: "/images/packages/Wedding/wedding-gold.jpg",
    category: "wedding",
    popular: true,
  },
  {
    name: "Wedding Silver",
    price: 3500000,
    description:
      "This is our standard combo, Get extra Special Attention When you Book with us.",
    features: [
      "1 Main photographer & An assistant",
      "2 Videographers",
      "250+ Photos in a Bridal Photobook",
      "3 Photo Boards (1A2, 2A3's)",
      "Beautiful Highlight Video",
      "Full Event Video (64GB Drive)",
      "Beautiful Social Media Reel",
      "6 Month Back Up",
    ],
    image: "/images/packages/Wedding/wedding-silver.jpg",
    category: "wedding",
  },

  // PORTRAIT – INDOOR (STUDIO)
  {
    name: "Studio Session",
    price: 250000,
    description: "Professional indoor portrait session in our studio.",
    features: [
      "1 hour session",
      "15 professionally edited photos",
      "Online gallery",
      "Print release",
    ],
    image: "/images/packages/Portrait/portrait-studio.jpg",
    category: "portrait-indoor",
  },

  // PORTRAIT – OUTDOOR
  {
    name: "Outdoor Session",
    price: 450000,
    description:
      "Beautiful outdoor portraits at a location of your choice.",
    features: [
      "1.5 hour session",
      "25 edited photos",
      "Online gallery",
      "Print release",
      "Travel within 10 km included",
    ],
    image: "/images/packages/Portrait/portrait-outdoor.jpg",
    category: "portrait-outdoor",
  },

  // CORPORATE PHOTOSHOOT
  {
    name: "Corporate Essentials",
    price: 1500000,
    description:
      "Professional headshots and office lifestyle coverage for teams.",
    features: [
      "3 hours on‑site coverage",
      "40+ edited photos",
      "Online gallery",
      "Commercial use license",
    ],
    image: "/images/packages/Corporate/corporate (1).jpg",
    category: "corporate",
  },

  // CREATIVE PHOTOSHOOT
  {
    name: "Creative Story",
    price: 500000,
    description:
      "Artistic and conceptual photography for brands or personal projects.",
    features: [
      "4 hours coverage",
      "50+ edited photos",
      "Creative direction included",
      "Online gallery",
    ],
    image: "/images/packages/Creative/creative-shoot.jpg",
    category: "creative",
  },
];

export function getAllPackages(): PackageType[] {
  return allPackages;
}

export function getFeaturedPackages(): PackageType[] {
  // Returns the top 3 targeted highlight packages
  return allPackages
    .filter(
      (p) =>
        p.name === "Wedding Gold" ||
        p.name === "Kwanjula Gold" ||
        p.name === "Kukyaala Gold"
    )
    .slice(0, 3);
}
