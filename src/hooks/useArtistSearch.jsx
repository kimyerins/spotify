import { useState } from "react";
import axios from "axios";

function useArtistSearch(token) {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const searchArtists = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  return {
    searchKey,
    setSearchKey,
    artists,
    searchArtists,
  };
}

export default useArtistSearch;
