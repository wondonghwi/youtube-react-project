export interface SearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface VideoItem {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
}

interface VideoId {
  kind: string;
  videoId: string;
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
}

interface ThumbnailDetail {
  url: string;
  width: number;
  height: number;
}
