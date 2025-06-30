export interface VideoItem {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  url: string;
  fallbackUrl?: string;
  fallbackThumbnail?: string;
}
