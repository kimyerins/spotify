import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi.jsx";

const fetchUserInfo = async () => {
    return api.get("/me", {
    });
};

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: () => fetchUserInfo(),
        select: (result) => result.data
    });
};
