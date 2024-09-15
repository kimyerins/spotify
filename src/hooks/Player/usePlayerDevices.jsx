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
    refetchInterval: 30000,
    enabled: !!token,
    retry: (failureCount, error) => {
      // 429 에러일 경우에만 재시도
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        if (retryAfter) {
          return new Promise((resolve) => {
            setTimeout(() => resolve(true), parseInt(retryAfter) * 1000);
          });
        }
        return failureCount < 3; // 최대 3번까지 재시도
      }
      return false; // 다른 에러의 경우 재시도하지 않음
    },
  });
};
