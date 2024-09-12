import React, { useState } from "react";
import Card from "../../common/Card";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import { useSpotifyAlbum } from "../../hooks/useSpotifyAlbum";

const HomePage = () => {
  const { token } = useSpotifyToken();
  const albumId = "4aawyAB9vmqN3uQ7FjRGTy";
  const { data, error, isLoading } = useSpotifyAlbum(token);
  console.log("data", data);
  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }

  // 에러 처리
  if (error) {
    console.error("Error fetching album:", error);
    return <span className="text-white">Error: {error.message}</span>;
  }

  // 데이터 확인
  if (!data || !data.name) {
    // data가 없거나 name이 없을 경우
    return <span className="text-white">No data available</span>;
  }

  return (
    <div className={"w-[100%]"}>
      <h2 className="text-white">HomePage</h2>
      <h3 className="text-white">{data.name}</h3>
      <img src={data.images[0]?.url} alt={data.name} width="600" />
      <Card />
    </div>
  );
};

export default HomePage;
