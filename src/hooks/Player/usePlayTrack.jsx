import { useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

const fetchPlayTrack = async ({ token, device_id, track_uri }) => {
  return api.put(
    `/me/player/play?device_id=${device_id}`,
    {
      uris: [track_uri],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const usePlayTrack = () => {
  return useMutation(fetchPlayTrack, {
    onSuccess: () => {
      console.log("트랙 재생이 성공적으로 시작되었습니다.");
    },
    onError: (error) => {
      console.error("트랙 재생 중 오류 발생:", error);
    },
  });
};
