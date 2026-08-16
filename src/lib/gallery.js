// Cray Stuff lifestyle gallery — Wiktor's freestyle + aesthetic shots. To add
// more, drop the files into public/gallery as gNN.jpg and bump GALLERY_COUNT
// (or list them explicitly).
const GALLERY_COUNT = 28;

export const galleryImages = Array.from(
  { length: GALLERY_COUNT },
  (_, i) => `/gallery/g${String(i + 1).padStart(2, "0")}.jpg`,
);
