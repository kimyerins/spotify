import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/useApi";

// 앨범을 라이브러리에 저장
const saveAlbumToLibrary = async (albumId) => {
  return api.put("/me/albums", {
    ids: [albumId], // 저장할 앨범 ID 배열
  });
};
//앨범을 라이브러리에 제거
const removeAlbumFromLibrary = async (albumId) => {
  return api.delete("/me/albums", {
    data: {
      ids: [albumId], // 제거할 앨범 ID 배열
    },
  });
};

// 라이브러리 저장여부확인
const checkIfAlbumIsSaved = async (albumId) => {
  return api.get(`/me/albums/contains?ids=${albumId}`);
};

export const useAlbumLibrary = (albumId) => {
  const queryClient = useQueryClient();

  // 1. 앨범이 라이브러리에 저장되었는지 여부 확인
  const {
    data: isSaved,
    isLoading: isCheckingSaved,
    refetch: refetchSaved,
  } = useQuery({
    queryKey: ["albumSaved", albumId],
    queryFn: () => checkIfAlbumIsSaved(albumId),
    enabled: !!albumId, // albumId이 있을 때만 실행
  });

  // 2. 앨범 저장 Mutation
  const { mutate: saveAlbum, isLoading: isSaving } = useMutation({
    mutationFn: () => saveAlbumToLibrary(albumId),
    onSuccess: () => {
      queryClient.invalidateQueries(["albumSaved", albumId]); // 저장 후 상태 업데이트
    },
  });

  // 3. 앨범 삭제 Mutation
  const { mutate: removeAlbum, isLoading: isRemoving } = useMutation({
    mutationFn: () => removeAlbumFromLibrary(albumId),
    onSuccess: () => {
      queryClient.invalidateQueries(["albumSaved", albumId]); // 삭제 후 상태 업데이트
    },
  });

  // 저장 또는 삭제 상태를 반환
  return {
    isSaved, // 앨범이 저장되어 있는지 여부
    isCheckingSaved, // 저장 여부 확인 중인지
    isSaving, // 저장 중인지
    isRemoving, // 삭제 중인지
    saveAlbum, // 앨범 저장 함수
    removeAlbum, // 앨범 삭제 함수
    refetchSaved, // 저장 여부 재요청 함수
  };
};
