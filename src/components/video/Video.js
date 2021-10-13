import React, { useEffect, useState } from "react";
import "./_video.scss";
import moment from "moment";
import numeral from "numeral";
import { request } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
const Video = ({ video }) => {
  const history = useHistory();
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const formatedDuration = moment.utc(seconds * 1000).format("mm:ss");

  const videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const videoClickHandler = () => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <div className="video" onClick={videoClickHandler}>
      <div className="video__top">
        {/* <img src={medium.url} alt="thumbnail" /> */}
        <LazyLoadImage src={medium.url} alt="thumbnail" effect="blur" />
        <span className="video__top__duration">{formatedDuration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>{numeral(views).format("0.a")} Views • </span>
        <span> {moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        {/* <img src={channelIcon?.url} alt="channel" /> */}
        <LazyLoadImage src={channelIcon?.url} alt="channel" effect="blur" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
