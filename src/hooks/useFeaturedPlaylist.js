import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchFeaturedPlaylist = async (token) => {
       return api.get("/browse/featured-playlists", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const useFeaturedPlaylist = (token) => {
    return useQuery({
        queryKey: ["featured-playlist"],
        queryFn: () => fetchFeaturedPlaylist(token),
        select: (result) => result.data,
    });
};
