'use client';

import Link from 'next/link';
import { getFeaturedPackages } from '@/lib/data/packages';
import PackageCard from '@/Components/PackageCard';

export default function OurPackages() {
  const featured = getFeaturedPackages();

  return (
    <section className="py-12 px-5 bg-bg-primary transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-start">
          <h2 className="text-3xl md:text-4xl font-bold text-(--color-text-light) mb-3">
            Our Packages
          </h2>
          <div className="h-1 w-20 bg-(--color-primary) rounded-none"></div>
        </div>

        {/* Packages List */}
        <div className="flex flex-col gap-8">
          {featured.map((pkg) => (
            <PackageCard key={pkg.name} package={pkg} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-end mt-8">
          <Link
            href="/packages"
            className="inline-block px-8 py-3 bg-(--color-footer-accent) text-white rounded-sm font-medium hover:bg-footer-accent-hover transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
