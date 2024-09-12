import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchFeaturedPlaylist = async () => {
       return api.get("/browse/featured-playlists", {
    });
};

export const useFeaturedPlaylist = () => {
    return useQuery({
        queryKey: ["featured-playlist"],
        queryFn: () => fetchFeaturedPlaylist(),
        select: (result) => result.data.playlists.items
    });
};
