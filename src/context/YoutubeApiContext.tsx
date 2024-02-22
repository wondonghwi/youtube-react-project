import { ReactNode, createContext, useContext } from 'react';
import YoutubeClient from '../api/youtubeClient';
import FakeYoutubeClient from '../api/fakeYoutubeClient';
import { IYoutubeService, Youtube } from '../api/youtube';

interface YoutubeApiContextType {
  youtube?: IYoutubeService;
}

// NOTE : Mocking the YoutubeClient
// const client = new FakeYoutubeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client);

export const YoutubeApiContext = createContext<YoutubeApiContextType>({});

export function YoutubeApiProvider({ children }: { children: ReactNode }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export const useYoutubeApi = () => {
  return useContext(YoutubeApiContext);
};
