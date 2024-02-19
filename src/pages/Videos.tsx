import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { VideoItem } from '../interfaces/popular';
import VideoCard from './VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const queryKey = ['videos', keyword];

  const queryFn = () => {
    if (!youtube) {
      return Promise.reject(new Error('YouTube API client is not available'));
    }

    return youtube.search(keyword);
  };

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<VideoItem[], Error>({
    queryKey,
    queryFn,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong</p>;
  if (!videos) return null;

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : '🔥'}</div>
      {videos.map((video) => (
        <ul key={video.id}>
          <VideoCard video={video} />
        </ul>
      ))}
    </>
  );
}

export default Videos;
