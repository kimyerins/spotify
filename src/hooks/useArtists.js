import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";
import {useDispatch, useSelector} from "react-redux";
import {homepageActions} from "../redux/reducer/homepageSlice.jsx";


const fetchArtists = async (ids) => {
    return api.get(`/artists?ids=${ids}`);
};

export const useArtists = (ids) => {

    const dispatch = useDispatch();

    const artistsObject = useSelector((state)=>state.homepage.artists)

    return useQuery({
        queryKey: ["artists",],
        queryFn: () => fetchArtists(ids),
        retry: false,
        select: (result) => dispatch(homepageActions.setArtists(result.data.artists)),
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        gcTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: Object.keys(artistsObject).length === 0,
    });
};
