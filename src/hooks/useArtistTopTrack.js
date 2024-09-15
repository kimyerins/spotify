import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";


const fetchArtistsTop = async (ids) => {
    return api.get(`/artists/${ids}/top-tracks?market=kr`);
};

export const useArtistsTopTrack = (ids) => {


    return useQuery({
        queryKey: ["artists-top",ids],
        queryFn: () => fetchArtistsTop(ids),
        retry: false,
        select: (result) => result.data.tracks,
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        gcTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
