import { VideoItem } from '../interfaces/popular';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  return <div>{video.snippet.title}</div>;
}
