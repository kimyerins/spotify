import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

const useSeekBar = (token) => {
  const [position, setPosition] = useState(0); // 초깃값 설정

  const seekToPosition = async (positionMs) => {
    await api.put(`/me/player/seek?position_ms=${positionMs}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const mutation = useMutation({
    mutationFn: seekToPosition,
    onSuccess: () => {
      console.log("Seek successful");
    },
    onError: (error) => {
      console.error("Error seeking:", error);
    },
  });

  const handleSeekChange = (e) => {
    setPosition(Number(e.target.value)); // 슬라이더 값 업데이트
  };

  const handleSeek = () => {
    mutation.mutate(position); // 슬라이더를 놓았을 때 시크 요청
  };

  return {
    position,
    setPosition,
    handleSeekChange,
    handleSeek,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useSeekBar;
