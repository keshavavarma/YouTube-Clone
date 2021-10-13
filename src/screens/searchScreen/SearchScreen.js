import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useParams } from "react-router-dom";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getVideosByKeyword } from "../../api";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";

const SearchScreen = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState();

  const getSearchVideos = async () => {
    setLoading(true);
    const response = await getVideosByKeyword(query);
    if (response.error) {
      console.log("Error is", response.error.message);
      setLoading(false);
    } else {
      setVideos(response.data.items);
      console.log("IN SearchScreen  Videos", response.data.items);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchVideos();
  }, [query]);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
