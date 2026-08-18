'use client';

import React, { useState, useEffect, useRef } from "react";
import PackageCard from "@/Components/PackageCard";
import { getAllPackages } from "@/lib/data/packages";
import { Check } from "lucide-react";
import Link from "next/link";
import CategoryScrollButtons from "@/Components/CategoryScrollButtons";

// --- Intersection Observer Component for smooth, non-glitchy scroll animations ---
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const categoryDetails: Record<string, { label: string; intro: string }> = {
  proposal: {
    label: "Proposal Packages",
    intro: "Capture the moment she says 'Yes' with our discreet, professional proposal photography and videography.",
  },
  kukyaala: {
    label: "Kukyaala Packages",
    intro: "Place your Kukyaala photography and videography in the hands of the best in Kampala.",
  },
  kuhingira: {
    label: "Kwanjula & Kuhingira Packages",
    intro: "Looking for an experienced photography team at affordable rates? You found us! Our pricing matrices are built to scale comfortably across every budget.",
  },
  wedding: {
    label: "Wedding Packages",
    intro: "Our signature wedding plans are built to deliver absolutely everything required to build timeless memories of your big day. Tie the knot in complete style.",
  },
  "portrait-indoor": {
    label: "Portrait Session – Indoor (Studio)",
    intro: "Join us at our fully equipped studio space for a relaxed, high-end, and professional portrait experience.",
  },
  "portrait-outdoor": {
    label: "Portrait Session – Outdoor",
    intro: "Select your favorite outdoor backdrop locations and let us leverage natural lighting mechanics to create stunning imagery.",
  },
  corporate: {
    label: "Corporate Photoshoot",
    intro: "Polished high-fidelity corporate headshots and workplace lifestyle imagery built specifically to elevate your commercial brand identity.",
  },
  creative: {
    label: "Creative Photoshoot",
    intro: "Bold, highly conceptual alternative photography configurations designed for clients who want to uniquely stand out.",
  },
};

const categoryOrder = [
  "proposal",
  "kukyaala",
  "kuhingira",
  "wedding",
  "portrait-indoor",
  "portrait-outdoor",
  "corporate",
  "creative",
];

const extraServices = [
  { label: "(2) 4K 50\" Display TVs", price: "USH 750,000" },
  { label: "Extra A3 Photobook", price: "FROM USH 480,000" },
  { label: "Drone Services (Full Day)", price: "USH 500,000" },
  { label: "Extra A4 Photobook", price: "FROM USH 350,000" },
  { label: "360 Photo Booth | Full Day", price: "+ USH 800,000" },
  { label: "Love Story (Shot from Our Office)", price: "Free Of Charge" },
  { label: "Extra Photographer", price: "+ USH 600,000" },
  { label: "Same Day Edit", price: "+ USH 600,000" },
  { label: "360 camera", price: "+ USH 800,000" }
];

export default function PackagesPage() {
  const allPackages = getAllPackages();

  const grouped = allPackages.reduce<Record<string, typeof allPackages>>(
    (acc, pkg) => {
      const cat = pkg.category || "uncategorised";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(pkg);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-20">
      
      {/* Header Section */}
      <FadeIn className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-(--color-footer-heading) transition-colors duration-300">
          Our <span className="text-(--color-footer-accent)">Packages</span>
        </h1>
        <div className="h-1 w-20 bg-(--color-primary) mx-auto mb-6 rounded-none"></div>
        <p className="text-footer-secondary text-lg max-w-2xl mx-auto transition-colors duration-300">
          Choose the perfect plan for your next event. Custom requests are always welcome.
        </p>
      </FadeIn>

      {/* Package Categories */}
      <div className="space-y-24">
        {categoryOrder.map((cat) => {
          const packages = grouped[cat];
          if (!packages || packages.length === 0) return null;

          const { label, intro } = categoryDetails[cat] || {
            label: cat,
            intro: "",
          };

          return (
            <section key={cat} id={cat} className="scroll-mt-24">
              <FadeIn delay={0}>
                <h2 className="text-3xl md:text-4xl font-bold text-(--color-footer-heading) mb-3 transition-colors duration-300">
                  {label}
                </h2>
              </FadeIn>
              
              {intro && (
                <FadeIn delay={100}>
                  <p className="text-footer-secondary whitespace-pre-line mb-8 max-w-3xl leading-relaxed transition-colors duration-300">
                    {intro}
                  </p>
                </FadeIn>
              )}

              <div className="flex flex-col gap-8">
                {packages.map((pkg, idx) => (
                  <FadeIn key={pkg.name} delay={150 + (idx * 100)}>
                    <PackageCard package={pkg} />
                  </FadeIn>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Extra Services */}
      <section className="mt-24 border-t border-(--color-footer-border) pt-16">
        <FadeIn delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold text-(--color-footer-heading) mb-3 transition-colors duration-300">
            Extra Epic Services
          </h2>
        </FadeIn>
        
        <FadeIn delay={100}>
          <p className="text-footer-secondary mb-8 max-w-2xl leading-relaxed transition-colors duration-300">
            Don't settle for mediocre events when you aim to exude excellence. Our
            extra features are fairly priced to bring out the absolute best in your celebration.
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extraServices.map((service, index) => (
            <FadeIn key={service.label} delay={(index % 3) * 100}>
              <div className="flex items-center justify-between bg-(--color-footer-bg) border border-(--color-footer-border) rounded-none px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="text-(--color-footer-heading) font-medium text-sm flex items-center gap-2 transition-colors duration-300">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  {service.label}
                </span>
                <span className="text-(--color-footer-accent) font-semibold text-sm whitespace-nowrap ml-4 transition-colors duration-300">
                  {service.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Custom Quote Footer */}
      <FadeIn delay={200} className="mt-20 text-center border-t border-(--color-footer-border) pt-10">
        <p className="text-footer-secondary text-base transition-colors duration-300">
          Need something custom?{" "}
          <Link
            href="/contact"
            className="text-(--color-footer-accent) hover:underline font-semibold transition-all"
          >
            Contact us
          </Link>{" "}
          for a personalized quote.
        </p>
      </FadeIn>

      <CategoryScrollButtons />
    </div>
  );
}
