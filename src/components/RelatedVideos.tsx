import { VideoItem } from '../interfaces/popular';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

interface RelatedVideosProps {
  id: VideoItem['snippet']['channelId'];
}

function RelatedVideos({ id }: RelatedVideosProps) {
  const { youtube } = useYoutubeApi();

  const queryKey = ['related', id];

  const queryFn = () => {
    if (!youtube || !youtube.relatedVideos) {
      return Promise.reject(new Error('YouTube API client is not available'));
    }

    return youtube.relatedVideos(id);
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
    <ul>
      {videos.map((video, index) => (
        <VideoCard
          video={video}
          key={index}
          type='list'
        />
      ))}
    </ul>
  );
}

export default RelatedVideos;
