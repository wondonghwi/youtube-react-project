import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { VideoItem } from '../interfaces/popular';

interface ChannelInfoProps {
  id: VideoItem['snippet']['channelId'];
  name: VideoItem['snippet']['channelTitle'];
}

function ChannelInfo({ id, name }: ChannelInfoProps) {
  const { youtube } = useYoutubeApi();

  const queryKey = ['channelImageUrl', id];

  const queryFn = () => {
    if (!youtube || !youtube.channelImageUrl) {
      return Promise.reject(new Error('YouTube API client is not available'));
    }

    return youtube.channelImageUrl(id);
  };

  const {
    isLoading,
    error,
    data: url,
  } = useQuery<string, Error>({
    queryKey,
    queryFn,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error occurred: {error.message}</div>;

  return (
    <div className='flex my-4 mb-8 items-center'>
      {url && (
        <img
          className='w-10 h-10 rounded-full'
          src={url}
          alt={name}
        />
      )}
      <p className='text-lg font-medium ml-2'>{name}</p>
    </div>
  );
}

export default ChannelInfo;
