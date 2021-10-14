import React, { useEffect, useState } from "react";
import "./_videoMetaData.scss";
import moment from "moment";
import numeral from "numeral";
import {
  MdThumbUp,
  MdOutlineThumbUpAlt,
  MdWatchLater,
  MdOutlineWatchLater,
} from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import HelmetCustom from "../HelmetCustom";
import { request } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

const VideoMetaData = ({
  video: { snippet, statistics },
  videoId,
  watchLaterHandler,
  likedHandler,
  unlikeHandler,
  removeWatchLater,
  watchLaterVideos,
  likedVideos,
}) => {
  const {
    channelId,
    channelTitle,
    description,
    title,
    publishedAt,
    thumbnails: { medium },
    resourceId,
  } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;
  const { currentUser } = useAuth();
  const [channelIcon, setChannelIcon] = useState(null);
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

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

  return (
    <div className="py-2 videoMetaData">
      <HelmetCustom title={title} description={description} />

      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="py-1 d-flex justify-content-between align-items-center">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              {likedVideos &&
              likedVideos.filter((video) => video.id === videoId).length !==
                0 ? (
                <MdThumbUp
                  size={30}
                  style={{
                    marginRight: "0.5rem",
                    color: "aquamarine",
                  }}
                  onClick={() => {
                    unlikeHandler();
                    // setLiked(!liked);
                  }}
                />
              ) : (
                <MdOutlineThumbUpAlt
                  size={30}
                  onClick={() => {
                    likedHandler(
                      channelId,
                      channelTitle,
                      description,
                      title,
                      publishedAt,
                      medium
                    );
                    // setLiked(!liked);
                  }}
                  style={{
                    marginRight: "0.5rem",
                  }}
                />
              )}
              {watchLaterVideos &&
              watchLaterVideos.filter((video) => video.id === videoId)
                .length !== 0 ? (
                <MdWatchLater
                  size={30}
                  style={{
                    marginRight: "0.5rem",
                    color: "aquamarine",
                  }}
                  onClick={() => removeWatchLater()}
                />
              ) : (
                <MdOutlineWatchLater
                  size={30}
                  onClick={() => {
                    watchLaterHandler(
                      channelId,
                      channelTitle,
                      description,
                      title,
                      publishedAt,
                      medium
                    );
                    // setWatchLater(!watchLater);
                  }}
                  style={{
                    marginRight: "0.5rem",
                  }}
                />
              )}
              {/* {numeral(likeCount).format("0.a")} */}
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img src={channelIcon?.url} alt="" className="mr-3 rounded-circle" />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginLeft: "0.5rem" }}
          >
            <span>{channelTitle}</span>
          </div>
        </div>
        {/* <div className="videoMetaData__channel_actions">
          <span className="mr-3">
            {liked ? (
              <MdThumbUp
                size={26}
                style={{
                  marginRight: "0.5rem",
                }}
                onClick={() => setLiked(!liked)}
              />
            ) : (
              <MdOutlineWatchLater
                size={26}
                onClick={() => setLiked(!liked)}
                style={{
                  marginRight: "0.5rem",
                }}
              />
            )}
          </span>
        </div> */}
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
