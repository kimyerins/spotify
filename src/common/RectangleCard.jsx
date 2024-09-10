import React from 'react';

const RectangleCard = ({genre, imgSrc}) => {
  return (
    <div className="relative bg-[#3B82F6] text-white p-4 rounded-lg w-64 h-40 overflow-hidden m-3">
      <span className="text-2xl font-bold absolute top-4 left-4 z-10">
        {genre}
      </span>
      <img
        aria-hidden="false"
        draggable="false"
        loading="lazy"
        src={imgSrc}
        alt="card image"
        className="absolute right-0 bottom-0 w-24 h-auto rotate-[28deg] z-0 rounded-md"
      />
    </div>
  );
};

export default RectangleCard;
