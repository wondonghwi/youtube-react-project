import { ReactNode, createContext, useContext } from 'react';
import { IYoutubeService, Youtube } from '../api/youtube';
import FakeYoutubeClient from '../api/fakeYoutubeClient';

interface YoutubeApiContextType {
  youtube?: IYoutubeService;
}

const client = new FakeYoutubeClient();
// const client = new YoutubeClient();
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
