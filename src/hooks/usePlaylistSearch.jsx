import { useState } from "react";
import axios from "axios";

function usePlaylistSearch(token) {
  const [searchKey, setSearchKey] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const searchPlaylists = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "playlist",
        },
      });
      setPlaylists(data.playlists.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return {
    searchKey,
    setSearchKey,
    playlists,
    searchPlaylists,
  };
}

export default usePlaylistSearch;
