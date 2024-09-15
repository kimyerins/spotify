import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const pendingRequests = new Map(); // 요청을 관리하는 맵

const fetchArtistsById = async (id) => {
  if (pendingRequests.has(id)) {
    // 동일한 id에 대한 요청이 진행 중이면 기존 요청의 Promise 반환
    return pendingRequests.get(id);
  }

  const fetchPromise = (async () => {
    try {
      const response = await api.get(`/artists/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"] || 1;
        console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return fetchArtistsById(id); // 재시도
      }
      throw error; // 429 외의 오류는 그대로 던짐
    } finally {
      pendingRequests.delete(id); // 요청이 완료되면 맵에서 삭제 -> 중복 요청 방지
    }
  })();

  pendingRequests.set(id, fetchPromise); // 맵에 요청 저장
  return fetchPromise;
};

export const useArtistById = (id) => {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchArtistsById(id),
    select: (result) => result,
    refetchOnWindowFocus: false, // 창이 다시 포커스될 때 자동으로 요청하지 않음
    refetchOnMount: false, // 컴포넌트가 마운트될 때 자동으로 요청하지 않음
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시된 데이터 유지
    retry: false, // 429 처리 로직이 있으므로 여기서는 재시도 비활성화
  });
};
