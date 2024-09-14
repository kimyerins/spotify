import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

// 플레이어 상태
const fetchPlayerState = async (token) => {
  return api.get("/me/player", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const usePlayerState = (token) => {
  const result = useQuery({
    queryKey: ["player-state", token],
    queryFn: () => fetchPlayerState(token),
    select: (result) => result.data || null,
    refetchInterval: 5000,
    enabled: !!token,
  });
  return { ...result, refetchPlayerState: result.refetch };
};

// 트랙 재생 API
const playTrack = async ({
  token,
  deviceData,
  context_uri,
  uris,
  offset,
  position_ms,
}) => {
  const payload = {};
  if (context_uri) payload.context_uri = context_uri;
  if (uris) payload.uris = uris;
  if (offset) payload.offset = offset;
  if (position_ms) payload.position_ms = position_ms;
  return api.put(`/me/player/play?device_id=${deviceData}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const usePlayTrack = () => {
  return useMutation({
    mutationFn: (params) => playTrack(params),
    onSuccess: () => {
      console.log("트랙이 성공적으로 재생되었습니다.");
    },
    onError: (error) => {
      console.error("트랙 재생 중 오류 발생:", error.response?.data || error);
    },
  });
};

// 트랙 일시 정지 API
const pauseTrack = async ({ token, deviceData }) => {
  return api.put(`/me/player/pause?device_id=${deviceData}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const usePauseTrack = () => {
  return useMutation({
    mutationFn: pauseTrack,
    onSuccess: () => {
      console.log("트랙이 성공적으로 일시 정지되었습니다.");
    },
    onError: (error) => {
      console.error("트랙 일시 정지 중 오류 발생:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
    },
  });
};
