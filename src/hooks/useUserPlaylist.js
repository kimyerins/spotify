import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserPlaylist = async (id) => {
    if(id) {
        return api.get(`/users/${id}/playlists`);
    }
    return null
};

export const useUserPlaylist = (id) => {
       return useQuery({
        queryKey: ["user-playlist",id],
        queryFn: () => fetchUserPlaylist(id),
        select: (result) => result.data.items,
       staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
       cacheTime: 1000 * 60 * 30, // 30분 동안 캐시에 유지됨
       refetchOnWindowFocus: false,
       refetchOnMount: false,
       retry: false, // 요청 실패 시 재시도하지 않음
    });
};
