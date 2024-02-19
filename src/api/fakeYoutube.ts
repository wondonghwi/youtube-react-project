import axios from 'axios';
import { SearchListResponse } from '../interfaces/search';
import { PopularListResponse, VideoItem } from '../interfaces/popular';

export default class FakeYoutube {
  async search(keyword?: string): Promise<VideoItem[]> {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async #searchByKeyword(keyword: string): Promise<VideoItem[]> {
    const response = await axios.get<SearchListResponse>(`/videos/search.json`);

    const convertedData: VideoItem[] = response.data.items.map((item) => {
      return {
        ...item,
        id: item.id.videoId,
      };
    });
    return convertedData;
  }

  async #mostPopular(): Promise<VideoItem[]> {
    const response = await axios.get<PopularListResponse>(
      `/videos/popular.json`,
    );
    const convertedData: VideoItem[] = response.data.items;
    return convertedData;
  }
}
