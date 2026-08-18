import { promises as fs } from 'fs';
import path from 'path';

export async function getGalleryImages(): Promise<string[]> {
  const galleryDirectory = path.join(
    process.cwd(),
    'public',
    'assets',
    'Gallery',
    'Images'
  );

  async function walkDirectory(directory: string): Promise<string[]> {
    let entries;
    try {
      entries = await fs.readdir(directory, { withFileTypes: true });
    } catch {
      return [];
    }

    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          return walkDirectory(fullPath);
        }

        if (/\.(jpg|jpeg|JPG|JPEG)$/.test(entry.name)) {
          return [fullPath];
        }

        return [];
      })
    );

    return files.flat();
  }

  const allFiles = await walkDirectory(galleryDirectory);

  return allFiles.map((file) => {
    const relativePath = path.relative(galleryDirectory, file).replace(/\\/g, '/');
    return `/assets/Gallery/Images/${relativePath}`;
  });
}

