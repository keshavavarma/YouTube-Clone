import axios from "axios";

export const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyCVOmoi9t86yOL1GwhhjrSwkrf6szCR1iE",
  },
});

export const getPopularVideos = async () => {
  try {
    const response = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: "",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    return { error: error };
  }
};
