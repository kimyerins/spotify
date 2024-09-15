import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

// 특정 디바이스의 볼륨 가져오기
const fetchVolume = async () => {
  const response = await api.get("/me/player"); // 플레이어 정보에서 볼륨 정보 가져오기
  return response.data?.device?.volume_percent || null; // 볼륨 정보 추출
};

// 볼륨을 설정하기 위한 API 호출
const setVolume = async ({ token, volume }) => {
  const response = await api.put(
    `/me/player/volume?volume_percent=${volume}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 볼륨을 가져오는 hook
export const useVolume = (token) => {
  return useQuery({
    queryKey: ["volume"],
    queryFn: () => fetchVolume(token),
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

// 볼륨을 설정하는 hook
export const useSetVolume = () => {
  return useMutation({
    mutationFn: setVolume,
    retry: false,
  });
};
