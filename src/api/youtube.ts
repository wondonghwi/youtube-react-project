import { AxiosResponse } from 'axios';
import { PopularListResponse, VideoItem } from '../interfaces/popular';
import { SearchListResponse } from '../interfaces/search';

export interface IYoutubeService {
  search(keyword?: string): Promise<VideoItem[]>;
  videos?: () => Promise<VideoItem[]>;
}

interface IYoutubeClient {
  search: (options: {
    params: { part: string; type: string; q?: string; maxResults: number };
  }) => Promise<AxiosResponse<SearchListResponse>>;
  videos: (options: {
    params: { part: string; chart: string; maxResults: number };
  }) => Promise<AxiosResponse<PopularListResponse>>;
}

export class Youtube implements IYoutubeService {
  private apiClient: IYoutubeClient;

  constructor(apiClient: IYoutubeClient) {
    this.apiClient = apiClient;
  }

  async search(keyword?: string): Promise<VideoItem[]> {
    return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
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
