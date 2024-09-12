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
  });
};
