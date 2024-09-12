import axios from "axios";
import useSpotifyToken from "../hooks/useSpotifyToken";

const { token } = useSpotifyToken();
const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
