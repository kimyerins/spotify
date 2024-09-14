import React from "react";
import Card from "../../common/Card.jsx";
import { useRecommendTrack } from "../../hooks/useRecomendTracks.js";

const Recommend = ({ data }) => {
  console.log("eeeerrrerererer");

  let { data: recommend, isLoading } = useRecommendTrack(data);

  console.log("tttttt", recommend);

  if (isLoading || !recommend || Object.keys(recommend).length === 0) {
    return "";
  }

  return (
    <div className={"mt-10"}>
      <h1>{`오늘의 추천장르!! ${data.toUpperCase()}`}</h1>
      <div
        className={"grid grid-cols-[repeat(auto-fit,minmax(165px,1fr))] gap-1"}
      >
        {recommend &&
          recommend.map((item, index) => (
            <Card
              key={index}
              title={item.name}
              subTitle={item.artists[0]?.name}
              imgUrl={item.album.images[item.album.images.length - 2]?.url}
            />
          ))}
      </div>
    </div>
  );
};

export default Recommend;
