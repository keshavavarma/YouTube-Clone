import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SkeletonTheme } from "react-loading-skeleton";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { collection, query, onSnapshot } from "firebase/firestore";

const LikedVideoScreen = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState();

  useEffect(() => {
    const getLikedVideos = async () => {
      const q = query(collection(db, `users/${currentUser.uid}/liked`));
      const unsub = onSnapshot(q, (snapshot) => {
        setVideos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      setLoading(false);
      console.log(videos);
      return unsub;
    };
    getLikedVideos();
  }, []);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal
            video={video.data}
            key={video.id}
            docID={video.id}
            watchScreen
            searchScreen
          />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default LikedVideoScreen;
