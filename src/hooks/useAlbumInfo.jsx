import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const pendingRequests = new Map(); // 이미 요청 중인 앨범을 저장하는 맵

/**앨범 id를 통해 앨범 데이터를 가져오기 */
const fetchAlbumInfo = async (id) => {
  if (pendingRequests.has(id)) {
    // 이미 동일한 id에 대한 요청이 진행 중이라면 해당 요청의 Promise를 반환
    return pendingRequests.get(id);
  }

  const fetchPromise = (async () => {
    try {
      const response = await api.get(`/albums/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"] || 1;
        console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return fetchAlbumInfo(id); // 재요청
      }
      throw error; // 429 외의 오류는 그대로 던짐
    } finally {
      pendingRequests.delete(id); // 요청이 완료되면 맵에서 삭제  -> 중복 요청 방지
    }
  })();

  pendingRequests.set(id, fetchPromise); // 새로운 요청을 맵에 저장
  return fetchPromise;
};

export const useAlbumInfo = (id) => {
  return useQuery({
    queryKey: ["album", id],
    queryFn: () => fetchAlbumInfo(id),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시된 데이터 유지
    retry: false, // react-query의 자동 재시도 비활성화, 429 처리는 fetchAlbumInfo에서 처리
  });
};
