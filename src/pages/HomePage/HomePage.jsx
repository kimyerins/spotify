import React, { useEffect } from "react";
import Card from "../../common/Card";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../../hooks/useUserInfo.jsx";
import { userInfoActions } from "../../redux/reducer/userInfoSlice.jsx";
import { useSpotifyAlbum } from "../../hooks/useSpotifyAlbum.jsx";

const HomePage = () => {
  const albumId = "4aawyAB9vmqN3uQ7FjRGTy";
  const { data: album, error, isLoading } = useSpotifyAlbum(albumId);

  const dispatch = useDispatch();

  const { data } = useUserInfo();
  useEffect(() => {
    if (data) {
      dispatch(userInfoActions.login(data));
    }
  }, [data, dispatch]);
  console.log("data", album);

  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }

  // 에러 처리
  if (error) {
    console.error("Error fetching album:", error);
    return <span className="text-white">Error: {error.message}</span>;
  }

  return (
    <div className={"w-[100%]"}>
      <h2 className="text-white">HomePage</h2>
      <h3 className="text-white">{album.name}</h3>
      <img src={album.images[0]?.url} alt={album.name} width="600" />
      <Card />
    </div>
  );
};

export default HomePage;
