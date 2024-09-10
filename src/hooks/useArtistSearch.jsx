import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchArtists = async (token, searchKey) => {
  if (!token || !searchKey) {
    throw new Error("Token or search key is missing!");
  }

  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      type: "artist",
    },
  });

  return data.artists.items;
};

export const useArtistSearchQuery = (token, searchKey) => {
  return useQuery({
    queryKey: ["artist-search", searchKey],
    queryFn: () => fetchArtists(token, searchKey),
    select: (result) => result,
  });
};
