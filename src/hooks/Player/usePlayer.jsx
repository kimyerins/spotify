import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";
import { fetchPlayerState } from "../../redux/reducer/playerStateSlice";

// 플레이어 상태
export const usePlayerState = (token) => {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.playerState);

  useEffect(() => {
    const fetchData = async () => {
      if (
        token &&
        (!playerState.lastFetchTime ||
          Date.now() - playerState.lastFetchTime > 10000)
      ) {
        await dispatch(fetchPlayerState(token));
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch, token, playerState.lastFetchTime]);

  const refetchPlayerState = () => {
    if (token) {
      dispatch(fetchPlayerState(token));
    }
  };

  return { ...playerState, refetchPlayerState };
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
      console.error("트랙 일시 정지 중 오류 발생:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
      }
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
