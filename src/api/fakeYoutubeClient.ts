import axios from 'axios';
import { SearchListResponse } from '../interfaces/search';
import { PopularListResponse } from '../interfaces/popular';

export default class FakeYoutubeClient {
  async search() {
    return axios.get<SearchListResponse>('/videos/search.json');
  }
  async videos() {
    return axios.get<PopularListResponse>('/videos/popular.json');
  }
}
