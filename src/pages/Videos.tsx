import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import FakeYoutube from '../api/fakeYoutube';
import { VideoItem } from '../interfaces/popular';
import VideoCard from './VideoCard';
import Youtube from '../api/youtube';

function Videos() {
  const { keyword } = useParams();
  const youtube = new Youtube();

  const queryKey = ['videos', keyword];

  const queryFn = () => youtube.search(keyword);

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
