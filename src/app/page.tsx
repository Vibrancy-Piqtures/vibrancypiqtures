import { getGalleryImages } from '@/lib/gallery';
import Hero from '@/Components/Hero';
import HomeGallery from '@/Components/HomeGallery';
import OurPackages from '@/Components/OurPackages';
import Reveal from '@/Components/Reveal';
import Link from 'next/link';

export default async function HomePage() {
  const allImages = await getGalleryImages();
  const homeGalleryImages = allImages.slice(0, 15);

  return (
    <>
      <Hero />
      <section id="gallery" className="scroll-mt-20 py-16">
        <Reveal direction="up" className="w-full">
          <HomeGallery images={homeGalleryImages} />
        </Reveal>
      </section>
      <div className="text-center py-12">
        <Reveal direction="up" delay={0.1}>
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-(--color-footer-accent) text-white rounded-full font-medium hover:bg-footer-accent-hover transition-colors"
          >
            View More Work
          </Link>
        </Reveal>
      </div>
      <section className="py-10">
        <Reveal direction="up">
          <OurPackages />
        </Reveal>
      </section>
    </>
  );
}
