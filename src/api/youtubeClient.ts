import axios, { AxiosInstance } from 'axios';
import { SearchListResponse } from '../interfaces/search';
import { PopularListResponse } from '../interfaces/popular';

export default class YoutubeClient {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params: object) {
    return this.httpClient.get<SearchListResponse>('search', params);
  }

  async videos(params: object) {
    return this.httpClient.get<PopularListResponse>('videos', params);
  }
}
