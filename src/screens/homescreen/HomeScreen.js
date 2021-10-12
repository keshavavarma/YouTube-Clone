import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getPopularVideos } from "../../api";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";

const HomeScreen = () => {
  const [videos, setVideos] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    const response = await getPopularVideos();
    if (response.error) {
      console.log("Error is", response.error.message);
    } else {
      console.log("IN Homescreen next pageToken", response.data.nextPageToken);
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken);
      console.log("IN Homescreen", response.data.items);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      <Container>
        {/* <CategoriesBar /> */}
        <Row>
          {videos &&
            videos.map((video) => (
              <Col lg={3} md={4} key={video.id}>
                <Video video={video} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
