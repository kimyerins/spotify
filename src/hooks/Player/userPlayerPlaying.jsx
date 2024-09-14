import { useQuery } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

// 현재 재생 목록 정보 가져오기
const fetchPlayinglist = async (token) => {
  const response = await api.get("/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchPlaylistWithQueue = async (token) => {
  const response = await api.get("/me/player/queue", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // 대기열 내 모든 트랙을 반환한다고 가정
};

export const usePlayerPlaying = (token) => {
  return useQuery({
    queryKey: ["playing-list"],
    queryFn: () => fetchPlayinglist(token),
    enabled: false,
  });
};

export const usePlayerQueue = (token) => {
  return useQuery({
    queryKey: ["player-queue"],
    queryFn: () => fetchPlaylistWithQueue(token),
    enabled: false,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
};
