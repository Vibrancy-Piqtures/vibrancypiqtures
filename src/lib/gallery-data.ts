import { promises as fs } from 'fs';
import path from 'path';

export interface GalleryImage {
  src: string;
  searchText: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  images: GalleryImage[];
}

async function getAllFilesWithSearch(dir: string, baseDir: string): Promise<GalleryImage[]> {
  let results: GalleryImage[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await getAllFilesWithSearch(fullPath, baseDir);
      results = results.concat(subResults);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      const relativePath = path.relative(baseDir, fullPath);
      const url = '/' + path.relative(path.join(process.cwd(), 'public'), fullPath).replace(/\\/g, '/');
      // Create search text from folder and file names
      const searchText = relativePath.split(path.sep).join(' ').toLowerCase();
      results.push({ src: url, searchText });
    }
  }
  return results;
}

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const galleryRoot = path.join(process.cwd(), 'public', 'assets', 'Gallery', 'Images');

  try {
    const topLevelEntries = await fs.readdir(galleryRoot, { withFileTypes: true });
    const categories: GalleryCategory[] = [];

    for (const entry of topLevelEntries) {
      if (entry.isDirectory()) {
        const categoryName = entry.name;
        const categoryPath = path.join(galleryRoot, categoryName);
        const images = await getAllFilesWithSearch(categoryPath, galleryRoot);

        if (images.length > 0) {
          categories.push({
            id: categoryName.toLowerCase().replace(/\s+/g, '-'),
            label: categoryName,
            images,
          });
        }
      }
    }

    return categories;
  } catch (error) {
    console.error('Error reading gallery directories:', error);
    return [];
  }
}

