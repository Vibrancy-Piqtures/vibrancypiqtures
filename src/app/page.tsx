import { getGalleryImages } from '@/lib/helpers/gallery';
import Hero from '@/Components/Hero';
import HomeGallery from '@/Components/HomeGallery';
import OurPackages from '@/Components/OurPackages';
import Reveal from '@/Components/Reveal';

export default async function HomePage() {
  const allImages = await getGalleryImages();
  const homeGalleryImages = allImages.slice(0, 15);

  return (
    <>
      <Hero />
      <section id="gallery" className="scroll-mt-20 ">
        <Reveal direction="up" className="w-full">
          <HomeGallery images={homeGalleryImages} />
        </Reveal>
      </section>
      <section>
        <Reveal direction="up">
          <OurPackages />
        </Reveal>
      </section>
    </>
  );
}