import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchRecommendTrack = async (genre) => {
    if(genre) {
        return api.get(`/recommendations?limit=15&market=KR&seed_genres=${genre}&target_popularity=50`);
    }
};

export const useRecommendTrack = (genre) => {
    return useQuery({
        queryKey: ["recommend",genre],
        queryFn: () => fetchRecommendTrack(genre),
        select: (result) => result.data.tracks,
        staleTime: 1000 * 60 * 30, // 30분 동안 데이터가 stale되지 않음
        cacheTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false, // 요청 실패 시 재시도하지 않음
    });
};
