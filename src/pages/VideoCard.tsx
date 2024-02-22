import { VideoItem } from '../interfaces/popular';
import { formatAgo } from '../util/date';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  return (
    <>
      <li>
        <img
          className='w-full'
          src={thumbnails.medium.url}
          alt={title}
        />
        <div>
          <p className='font-semibold my-2 line-clamp-2'>{title}</p>
          <p>{channelTitle}</p>
          <p>{formatAgo(publishedAt, 'ko')}</p>
        </div>
      </li>
    </>
  );
}
