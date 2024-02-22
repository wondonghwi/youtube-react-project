import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { VideoItem } from '../interfaces/popular';
import VideoCard from '../components/VideoCard';
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
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
        {videos.map((video) => (
          <VideoCard
            video={video}
            key={video.id}
          />
        ))}
      </ul>
    </>
  );
}

export default Videos;
