import axios from "axios";

const BASE_URL = "https://accounts.spotify.com/api/token";

export const getAccessToken = async () => {
  const authParam = {
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  };

  try {
    const res = await axios.post(
      BASE_URL,
      new URLSearchParams(authParam).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    window.localStorage.setItem("token", res.data.access_token);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
