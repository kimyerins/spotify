import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";
const fetchGenreSeeds = async () => {
  return api.get(`/recommendations/available-genre-seeds`);
};

export const useGenreSeeds = () => {

    return useQuery({
        queryKey: ["genre",],
        queryFn: () => fetchGenreSeeds(),
        retry: false,
        select: (result) => result.data.genres,
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        gcTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
