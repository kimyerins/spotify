import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserPlaylist = async (id) => {
    if(id) {
        return api.get(`/users/${id}/playlists`);
    }
};

export const useUserPlaylist = (id) => {
    return useQuery({
        queryKey: ["user-playlist",id],
        queryFn: () => fetchUserPlaylist(id),
        select: (result) => result.data.items
    });
};
