import { useQuery } from "@tanstack/react-query";
import api from "../../utils/useApi.jsx";

const fetchPlayerState = async (token) => {
  return api.get("/me/player", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const usePlayerState = (token) => {
  return useQuery({
    queryKey: ["player-state"],
    queryFn: () => fetchPlayerState(token),
    select: (result) => result.data,
    refetchInterval: 10000,
  });
};
