import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserPlaylist = async () => {
       return api.get("/me/playlists", {
    });
};

export const useUserPlaylist = () => {
    return useQuery({
        queryKey: ["user-playlist"],
        queryFn: () => fetchUserPlaylist(),
        select: (result) => result.data.items
    });
};
