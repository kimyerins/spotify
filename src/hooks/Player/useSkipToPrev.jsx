import { useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

// 이전 트랙으로 건너뛰기
const skipToPrevious = async ({ token, deviceData }) => {
  return api.post("/me/player/previous", null, {
    params: { deviceData },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSkipToPrevious = () => {
  return useMutation({
    mutationFn: skipToPrevious,
    onSuccess: () => {
      console.log("이전 트랙으로 성공적으로 건너뛰었습니다.");
    },
    onError: (error) => {
      console.error(
        "이전 트랙으로 건너뛰기 중 오류 발생:",
        error.response?.data || error
      );
    },
  });
};
