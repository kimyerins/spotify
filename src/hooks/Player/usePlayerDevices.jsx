import { useQuery } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

const fetchPlayerDevices = async (token) => {
  return api.get("/me/player/devices", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const usePlayerDevices = (token) => {
  return useQuery({
    queryKey: ["player-devices"],
    queryFn: () => fetchPlayerDevices(token),
    select: (result) => result.data,
    staleTime: 1000 * 60 * 30, // 30분 동안 데이터가 stale되지 않음
    gcTime: 1000 * 60 * 60, // 60분 동안 캐시에 유지됨
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false, // 요청 실패 시 재시도하지 않음
  });
};
