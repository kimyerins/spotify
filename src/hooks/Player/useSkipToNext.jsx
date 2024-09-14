import { useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

// 다음 트랙으로 건너뛰기
const skipToNext = async ({ token, deviceData }) => {
  return api.post("/me/player/next", null, {
    params: { deviceData },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSkipToNext = () => {
  return useMutation({
    mutationFn: skipToNext,
    onSuccess: () => {
      console.log("다음 트랙으로 성공적으로 건너뛰었습니다.");
    },
    onError: (error) => {
      console.error(
        "다음 트랙으로 건너뛰기 중 오류 발생:",
        error.response?.data || error
      );
    },
  });
};
