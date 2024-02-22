import React from 'react';
import { VideoItem } from '../interfaces/popular';

interface ChannelInfoProps {
  id: VideoItem['snippet']['channelId'];
  name: VideoItem['snippet']['channelTitle'];
}

function ChannelInfo({ id, name }: ChannelInfoProps) {
  return <div></div>;
}

export default ChannelInfo;
