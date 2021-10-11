import React from "react";
import thumbnail from "../../images/sheldoncooper.jpeg";
import channelImage from "../../images/captainhook.jpeg";
import "./_video.scss";

const Video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <img src={thumbnail} alt="thumbnail" />
        <span>07:10</span>
      </div>
      <div className="video__title">Best sheldoncooper moments</div>
      <div className="video__details">
        <span>12m Views •</span>
        <span>2 months ago</span>
      </div>
      <div className="video__channel">
        <img src={channelImage} alt="channel" />
        <p>Captain Hook</p>
      </div>
    </div>
  );
};

export default Video;
