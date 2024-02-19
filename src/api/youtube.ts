import axios, { AxiosInstance } from 'axios';
import { SearchListResponse } from '../interfaces/search';
import { PopularListResponse, VideoItem } from '../interfaces/popular';

export default class Youtube {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }
  async search(keyword?: string): Promise<VideoItem[]> {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword?: string): Promise<VideoItem[]> {
    const response = await this.httpClient.get<SearchListResponse>('search', {
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

  async #mostPopular(): Promise<VideoItem[]> {
    const response = await this.httpClient.get<PopularListResponse>('videos', {
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
