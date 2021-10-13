import axios from "axios";

export const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: process.env.REACT_APP_YT_API_KEY,
  },
});

export const getPopularVideos = async (pageToken = "") => {
  try {
    const response = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: pageToken,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    return { error: error };
  }
};
export const getVideoByID = async (id) => {
  try {
    const response = await request.get("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    return { error: error };
  }
};

export const getRelatedVideos = async (id) => {
  try {
    const response = await request.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    return { error: error };
  }
};
export const getVideosByKeyword = async (keyword) => {
  try {
    const response = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
        videoLicense: "any",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    return { error: error };
  }
};
