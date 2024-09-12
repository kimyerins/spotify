import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategory = async (token, limit = 10) => {  // limit 기본값을 10으로 설정
  if (!token) {
    throw new Error("Token is missing!");
  }

  const { data } = await axios.get("https://api.spotify.com/v1/browse/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,  // limit을 쿼리 파라미터로 추가
    },
  });

  return data.categories.items;
};

export const useCategoryQuery = (token, limit) => {
  return useQuery({
    queryKey: ["get-category", limit],
    queryFn: () => fetchCategory(token, limit),  // limit을 fetchCategory에 전달
    select: (result) => result,
  });
};
