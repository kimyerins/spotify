import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const fetchAlbumsOfArtists = async (artistId) => {
  return api.get(`/artists/${artistId}/albums`);
};

export const useAlbumsOfArtists = (artistId) => {
  return useQuery({
    queryKey: ["artists", artistId, "albums"],
    queryFn: () => fetchAlbumsOfArtists(artistId),
    select: (result) => result.data,
  });
};
