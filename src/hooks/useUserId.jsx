import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserId = async () => {
    return api.get("/me", {
    });
};

export const useUserId = () => {
    return useQuery({
        queryKey: ["user-id"],
        queryFn: () => fetchUserId(),
        select: (result) => result.data
    });
};
