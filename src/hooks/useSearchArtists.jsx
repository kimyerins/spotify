import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

// Spotify Search API를 통해 곡을 검색하는 함수
const searchArtists = async (query) => {
    const { data } = await api.get(`/search`, {
      params: {
        q: query,
        type: 'artist',
        limit: 2, // 원하는 검색 결과 수
      },
    });
    return data.artists.items; 
  };
  
  // React Query 훅을 사용해 Search API에서 데이터를 가져오는 훅
  export const useSearchArtists = (query) => {
    return useQuery({
      queryKey: ["search", query], // 캐시 키에 검색어를 포함
      queryFn: () => searchArtists(query),
      enabled: !!query, // query 값이 있을 때만 실행
      retry: false, // 실패 시 재시도하지 않음
      staleTime: 1000 * 60 * 10, // 데이터가 10분 동안 신선함으로 유지
      cacheTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
      refetchOnWindowFocus: false, // 창 포커스 시 다시 요청하지 않음
    });
  };