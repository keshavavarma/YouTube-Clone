import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getPopularVideos } from "../../api";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "../../components/video/Video";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoSkeleton from "../../components/skeletons/VideoSkeleton";

const HomeScreen = () => {
  const [videos, setVideos] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    setLoading(true);
    const response = await getPopularVideos();
    if (response.error) {
      console.log("Error is", response.error.message);
      setLoading(false);
    } else {
      console.log("IN Homescreen next pageToken", response.data.nextPageToken);
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken);
      setLoading(false);
      console.log("IN Homescreen", response.data.nextPageToken);
    }
  };
  const fetchData = async () => {
    const response = await getPopularVideos(nextPageToken);
    if (response.error) {
      console.log("Error is", response.error.message);
    } else {
      console.log("IN Homescreen next pageToken", response.data.nextPageToken);
      setVideos((videos) => videos.concat(response.data.items));
      setNextPageToken(response.data.nextPageToken);
      console.log("IN Homescreen videos", videos);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      <Container>
        {/* <CategoriesBar /> */}
        <InfiniteScroll
          dataLength={videos ? videos.length : 0}
          next={fetchData}
          hasMore={true}
          loader={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
              }}
            >
              <CircularProgress color="inherit" />
            </div>
          }
        >
          <Row>
            {!loading
              ? videos &&
                videos.map((video) => (
                  <Col lg={3} md={4} key={video.id}>
                    <Video video={video} />
                  </Col>
                ))
              : [...Array(20)].map(() => (
                  <Col lg={3} md={4}>
                    <VideoSkeleton />
                  </Col>
                ))}
          </Row>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default HomeScreen;
