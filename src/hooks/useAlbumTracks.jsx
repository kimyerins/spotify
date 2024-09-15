import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const fetchAlbumTracks = async (id) => {
  return api.get(`/albums/${id}tracks`);
};

/**앨범 id를 통해 앨범데이터 가져오기 */
export const useAlbumTracks = (id) => {
  return useQuery({
    queryKey: ["album", id, "tracks"],
    queryFn: () => fetchAlbumTracks(id),
    select: (result) => result.data,
    refetchOnWindowFocus: false, // 창이 다시 포커스될 때 자동으로 요청하지 않음
    refetchOnMount: false, // 컴포넌트가 마운트될 때 자동으로 요청하지 않음
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선한 상태로 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시된 데이터 유지
    retry: 2,
    retryDelay: 3000,
  });
};
