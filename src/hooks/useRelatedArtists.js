import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchRelatedArtists = async (id) => {
    return api.get(`/artists/${id}/related-artists`);
};

export const useRelatedArtists = (id) => {
    return useQuery({
        queryKey: ["related-artists",],
        queryFn: () => fetchRelatedArtists(id),
        retry: false,
        select: (result) => result.data,
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        cacheTime: 1000 * 60 * 30, // 30분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
