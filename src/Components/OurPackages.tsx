import Link from 'next/link';
import { getFeaturedPackages } from '@/lib/packages';
import PackageCard from '@/Components/PackageCard';

export default function OurPackages() {
  const featured = getFeaturedPackages();

  return (
    <section className="py-20 px-5 bg-bg-primary transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-(--color-text-light) mb-12 text-center">
          Our Packages
        </h2>
        <div className="flex flex-col gap-8">
          {featured.map((pkg) => (
            <PackageCard key={pkg.name} package={pkg} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-block px-8 py-3 bg-(--color-footer-accent) text-white rounded-full font-medium hover:bg-footer-accent-hover transition-colors"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}