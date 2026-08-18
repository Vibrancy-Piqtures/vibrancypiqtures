'use client';

import { Check } from "lucide-react";
import FadeInImage from "./FadeInImage";
import BookNowButton from "@/Components/BookNowButton";

export interface PackageType {
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
  category?: string;
}

interface PackageCardProps {
  package: PackageType;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US").format(pkg.price);

  return (
    <div className="group bg-(--color-footer-bg) dark:bg-(--color-footer-bg-dark) dark:border-(--color-footer-border-dark) rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row w-full min-h-80">
      {/* Image Container */}
      <div className="relative w-full h-64 md:h-auto md:w-2/5 min-h-60 overflow-hidden shrink-0">
        <FadeInImage
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
        {pkg.popular && (
          <span className="absolute top-4 left-4 bg-(--color-footer-accent) text-white text-xs font-bold px-3 py-1 rounded-sm z-10 shadow-sm">
            Most Popular
          </span>
        )}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-sm text-xs md:text-sm font-semibold z-10 shadow-sm">
          From USH {formattedPrice}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-(--color-footer-heading) dark:text-(--color-footer-heading-dark) mb-2 group-hover:text-(--color-footer-accent) dark:group-hover:text-(--color-footer-accent) transition-colors">
            {pkg.name}
          </h3>
          <p className="text-footer-secondary dark:text-(--color-footer-secondary-dark) text-sm md:text-base mb-6 leading-relaxed">
            {pkg.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-8">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-(--color-footer-text) dark:text-(--color-footer-text-dark)">
                <Check className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <BookNowButton
          packageName={pkg.name}
          packagePrice={pkg.price}
          variant="primary"
          className="w-full sm:w-auto sm:px-8 self-start text-white tracking-wide font-semibold text-sm md:text-base shadow-sm rounded-sm"
        />
      </div>
    </div>
  );
}

