import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const fetchAlbumInfo = async (albumId) => {
  return api.get(`/albums/${albumId}`);
};

export const useAlbumInfo = (albumId) => {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: () => fetchAlbumInfo(albumId),
    select: (result) => result.data,
  });
};
