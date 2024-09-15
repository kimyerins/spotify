import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserInfo = async () => {
    return api.get("/me", {
    });
};

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: () => fetchUserInfo(),
        select: (result) => result.data,
        staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale되지 않음
        gcTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false, // 요청 실패 시 재시도하지 않음
    });
};
