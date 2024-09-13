import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";



const fetchArtists = async (ids) => {
    return api.get(`/artists?ids=${ids}`);
};

export const useArtists = (ids) => {
    return useQuery({
        queryKey: ["artists",],
        queryFn: () => fetchArtists(ids),
        retry: false,
        select: (result) => result.data.artists,
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        cacheTime: 1000 * 60 * 30, // 30분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
