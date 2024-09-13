import React from 'react';

const RectangleCard = ({genre, imgSrc, index}) => {
  // 카드 색 배열
  const colors = ['#db148b', '#016450', '#8400e7', '#1e3264', '#5f8108', '#2d46ba', '#477d95', '#b02896', '#158a08','#b95d06'];
  // 인덱스를 기반으로 색 지정
  const color = colors[index % colors.length];

  return (
    <div className="relative text-white p-4 rounded-lg w-full aspect-video overflow-hidden"
         style={{ backgroundColor: color }}>
      <span className="text-2xl font-bold absolute top-4 left-4 z-1">
        {genre}
      </span>
      <img
        aria-hidden="false"
        draggable="false"
        loading="lazy"
        src={imgSrc}
        alt="card image"
        className="absolute -right-6 -bottom-8 w-28 h-auto rotate-[28deg] z-0 rounded-[4px]"
      />
    </div>
  );
};

export default RectangleCard;
