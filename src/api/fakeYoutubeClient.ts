import axios from 'axios';
import { SearchListResponse } from '../interfaces/search';
import { PopularListResponse } from '../interfaces/popular';
import { ChannelListResponse } from '../interfaces/channels';

export default class FakeYoutubeClient {
  async search() {
    return axios.get<SearchListResponse>('/videos/search.json');
  }

  async videos() {
    return axios.get<PopularListResponse>('/videos/popular.json');
  }

  async channelImageUrl() {
    return axios.get<ChannelListResponse>('/videos/channels.json');
  }

  async relatedVideos() {
    return axios.get<SearchListResponse>('/videos/related.json');
  }
}
