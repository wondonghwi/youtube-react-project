import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import { VideoItem } from '../interfaces/popular';
import RelatedVideos from '../components/RelatedVideos';

function VideoDetail() {
  const video: VideoItem = useLocation().state.video;

  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    <section>
      <article>
        <iframe
          id='player'
          width='100%'
          height='640'
          src={`https://www.youtube.com/embed/${video.id}`}
          style={{ border: 'none' }}
          title=''
        />
        <div>
          <h2>{title}</h2>
          <ChannelInfo
            id={channelId}
            name={channelTitle}
          />
        </div>
        <pre>{description}</pre>
      </article>
      <section>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}

export default VideoDetail;
