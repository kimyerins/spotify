import React from 'react';

const RectangleCard = ({genre, imgSrc}) => {
  return (
    <div className="relative bg-[#3B82F6] text-white p-4 rounded-lg w-full aspect-video overflow-hidden">
      <span className="text-2xl font-bold absolute top-4 left-4 z-10">
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
