import { AxiosResponse } from 'axios';
import { PopularListResponse, VideoItem } from '../interfaces/popular';
import { SearchListResponse } from '../interfaces/search';
import { ChannelListResponse } from '../interfaces/channels';

export interface IYoutubeService {
  search(keyword?: string): Promise<VideoItem[]>;
  videos?: () => Promise<VideoItem[]>;
  channelImageUrl?: (id: string) => Promise<string>;
  relatedVideos?: (id: string) => Promise<VideoItem[]>;
}

interface IYoutubeClient {
  search: (options: {
    params: {
      part: string;
      type: string;
      q?: string;
      maxResults: number;
      relatedToVideoId?: string;
    };
  }) => Promise<AxiosResponse<SearchListResponse>>;
  videos: (options: {
    params: { part: string; chart: string; maxResults: number };
  }) => Promise<AxiosResponse<PopularListResponse>>;
  channelImageUrl: (options: {
    params: { part: string; chart?: string; maxResults?: number; id: string };
  }) => Promise<AxiosResponse<ChannelListResponse>>;
  relatedVideos?: (id: string) => Promise<AxiosResponse<SearchListResponse>>;
}

export class Youtube implements IYoutubeService {
  private apiClient: IYoutubeClient;

  constructor(apiClient: IYoutubeClient) {
    this.apiClient = apiClient;
  }

  async search(keyword?: string): Promise<VideoItem[]> {
    return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
  }

  async channelImageUrl(id: string) {
    const response = await this.apiClient.channelImageUrl({
      params: { part: 'snippet', id },
    });
    const convertedData: string =
      response.data.items[0].snippet.thumbnails.default.url;
    return convertedData;
  }

  async relatedVideos(id: string): Promise<VideoItem[]> {
    const response = await this.apiClient.search({
      params: {
        part: 'snippet',
        type: 'video',
        relatedToVideoId: id,
        maxResults: 25,
      },
    });
    const convertedData: VideoItem[] = response.data.items.map((item) => {
      return {
        ...item,
        id: item.id.videoId,
      };
    });
    return convertedData;
  }

  private async searchByKeyword(keyword?: string): Promise<VideoItem[]> {
    const response = await this.apiClient.search({
      params: {
        part: 'snippet',
        type: 'video',
        q: keyword,
        maxResults: 25,
      },
    });

    const convertedData: VideoItem[] = response.data.items.map((item) => {
      return {
        ...item,
        id: item.id.videoId,
      };
    });
    return convertedData;
  }

  private async mostPopular(): Promise<VideoItem[]> {
    const response = await this.apiClient.videos({
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      },
    });
    const convertedData: VideoItem[] = response.data.items;
    return convertedData;
  }
}
