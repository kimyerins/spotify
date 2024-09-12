import { useQuery } from "@tanstack/react-query";
import useApi from "../utils/useApi";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchAlbum = async (albumId) => {
  const api = useApi();
  await delay(1000);
  const response = await api.get(`/albums/${albumId}`);
  return response.data;
};

export const useSpotifyAlbum = (albumId) => {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: () => fetchAlbum(albumId),
    enabled: !!albumId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
