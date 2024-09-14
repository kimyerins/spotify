import { useQuery } from "@tanstack/react-query";
import api from "../utils/useApi";

const fetchCategory = async (limit = 10) => {
  const response = await api.get("/browse/categories", {
    params: {
      limit,  // limit을 쿼리 파라미터로 추가
    },
  });
  return response.data?.categories?.items || [];  //데이터가 없으면 빈 배열 반환
};

export const useCategoryQuery = (limit) => {
  return useQuery({
    queryKey: ["get-category", limit],
    queryFn: () => fetchCategory(limit),
    select: (result) => result,
  });
};
