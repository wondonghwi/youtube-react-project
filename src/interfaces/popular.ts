export interface PopularListResponse {
  kind: string;
  etag: string;
  items: VideoItem[];
  nextPageToken: string;
  pageInfo: PageInfo;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}

interface Thumbnails {
  default: ThumbnailDetail;
  medium: ThumbnailDetail;
  high: ThumbnailDetail;
  standard?: ThumbnailDetail;
  maxres?: ThumbnailDetail;
}

interface ThumbnailDetail {
  url: string;
  width: number;
  height: number;
}

interface Localized {
  title: string;
  description: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
