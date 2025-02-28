
export interface GifResponse {
  id: string;
  content_description: string;
  media_formats: {
    gif: {
      url: string;
      duration: number;
      dims: number[];
      size: number;
    };
    mp4?: {
      url: string;
      duration: number;
      dims: number[];
      size: number;
    };
    webm?: {
      url: string;
      duration: number;
      dims: number[];
      size: number;
    };
  };
  created: number;
  tags: string[];
  url: string;
}
