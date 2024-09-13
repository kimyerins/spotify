import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

// 모든 타입의 검색 결과를 반환하는 함수
const fetchSearchResults = async (query, limit = 10) => {
  if (!query) return [];

  const response = await api.get("/search", {
    params: {
      q: query,    // 검색어를 쿼리 파라미터로 전달
      type: "track,artist,album,playlist",  // 여러 타입을 동시에 요청
      limit,       // 각 타입별로 결과의 최대 개수
    },
  });
  return {
    tracks: response.data.tracks?.items || [],
    artists: response.data.artists?.items || [],
    albums: response.data.albums?.items || [],
    playlists: response.data.playlists?.items || [],
  };  // 각 타입별로 데이터를 반환
};

// useSearchQuery 훅을 수정하여 모든 타입의 검색 결과를 반환
export const useSearchQuery = (query, limit = 10) => {
  return useQuery({
    queryKey: ["search", query, limit],  // queryKey에는 검색어와 제한을 포함
    queryFn: () => fetchSearchResults(query, limit),
    enabled: !!query,  // query 값이 있을 때만 실행
  });
};
