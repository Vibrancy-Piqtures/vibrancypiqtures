import { getGalleryCategories } from '@/lib/gallery-data';
import GalleryClient from '@/Components/GalleryClient';

export default async function GalleryPage() {
  const categories = await getGalleryCategories();

  return (
    <div className="bg-(--page-bg) min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-(--text-primary) mb-8">
          Our Gallery
        </h1>
        {categories.length === 0 ? (
          <p className="text-(--text-secondary) text-lg">
            No gallery images found. Add subfolders with images to{' '}
            <code className="font-mono">public/Gallery/Images</code>.
          </p>
        ) : (
          <GalleryClient categories={categories} />
        )}
      </div>
    </div>
  );
}
