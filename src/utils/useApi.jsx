import axios from "axios";


const token = localStorage.getItem("spotifyToken");
const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});


export default api;
