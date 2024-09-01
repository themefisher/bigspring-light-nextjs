"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YoutubePlayer = ({ id, title, ...others }) => {
  return <LiteYouTubeEmbed id={id} title={title} {...others} />;
};

export default YoutubePlayer;
