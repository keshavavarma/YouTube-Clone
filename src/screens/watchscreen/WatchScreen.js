import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";

import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import { Helmet } from "react-helmet";
import "./_watchScreen.scss";
import { getRelatedVideos, getVideoByID } from "../../api";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { collection, query, addDoc, deleteDoc, doc } from "firebase/firestore";

const WatchScreen = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [docID, setDocID] = useState();

  const getSelectedVideo = async () => {
    setLoading(true);
    const response = await getVideoByID(id);
    if (response.error) {
      console.log("Error is", response.error.message);
      setLoading(false);
    } else {
      setVideo(response.data.items[0]);
      console.log("IN WatchScreen ", response.data.items[0]);
      setLoading(false);
    }
  };

  const getRecomendations = async () => {
    setLoading(true);
    const response = await getRelatedVideos(id);
    if (response.error) {
      console.log("Error is", response.error.message);
      setLoading(false);
    } else {
      setRelatedVideos(response.data.items);
      console.log("IN WatchScreen related Videos", response.data.items);
      setLoading(false);
    }
  };

  const watchLaterHandler = async (
    channelId,
    channelTitle,
    description,
    title,
    publishedAt,
    medium
  ) => {
    const q = query(collection(db, `users/${currentUser.uid}/watchLater`));
    const addedVideo = await addDoc(q, {
      id: id,
      snippet: {
        channelId,
        channelTitle,
        description,
        title,
        publishedAt,
        thumbnails: {
          medium: medium,
        },
      },
    });
  };

  const likedHandler = async (
    channelId,
    channelTitle,
    description,
    title,
    publishedAt,
    medium
  ) => {
    const q = query(collection(db, `users/${currentUser.uid}/liked`));
    const addedVideo = await addDoc(q, {
      id: id,
      snippet: {
        channelId,
        channelTitle,
        description,
        title,
        publishedAt,
        thumbnails: {
          medium: medium,
        },
      },
    });
  };

  // const unlikeHandler = async (id) => {
  //   await deleteDoc(doc(db, `users/${currentUser.uid}/liked/${id}`));
  // };

  useEffect(() => {
    getSelectedVideo();
    getRecomendations();
  }, [id]);

  return (
    <Row>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData
            video={video}
            videoId={id}
            watchLaterHandler={watchLaterHandler}
            likedHandler={likedHandler}
          />
        ) : (
          <h6>Loading...</h6>
        )}
        {/* <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        /> */}
      </Col>
      <Col lg={4}>
        {!loading ? (
          relatedVideos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
