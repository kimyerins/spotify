import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const fetchAlbum = async (token) => {
  return api.get(`/albums/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSpotifyAlbum = (token) => {
  return useQuery({
    queryKey: ["album", token],
    queryFn: () => fetchAlbum(token),
    select: (result) => result.data,
  });
};
