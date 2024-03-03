import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import { VideoItem } from '../interfaces/popular';
import RelatedVideos from '../components/RelatedVideos';

function VideoDetail() {
  const video: VideoItem = useLocation().state.video;

  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          id='player'
          width='100%'
          height='640'
          src={`https://www.youtube.com/embed/${video.id}`}
          style={{ border: 'none' }}
          title={title}
        />
        <div className='p-8'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <ChannelInfo
            id={channelId}
            name={channelTitle}
          />
        </div>
        <pre className='whitespace-pre-wrap'>{description}</pre>
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}

export default VideoDetail;
