import React from "react";

const AlbumBanner = ({ albumData }) => {
  let total_duration_ms = 0;
  albumData?.tracks?.items?.map((song) => {
    total_duration_ms += song.duration_ms;
  });
  const seconds = Math.floor((total_duration_ms / 1000) % 60);
  const minutes = Math.floor((total_duration_ms / (1000 * 60)) % 60);
  const hours = Math.floor(total_duration_ms / (1000 * 60 * 60));

  console.log(`${hours}시간 ${minutes}분 ${seconds}초`);

  return (
    <div className="relative flex justify-center items-center  rounded-md w-full flex-grow-1  ">
      <div className="z-10 flex justify-center items-center  rounded-md w-full p-4">
        <div className="z-10 flex gap-6 self-stretch w-full h-full   ">
          <div
            className="rounded-md w-[232px] h-[232px] bg-cover shadow-custom shadow-xl  hover:scale-[102%] transition-all duration-200"
            style={{
              backgroundImage: `url(${albumData?.images[0]?.url})`,
            }}
          ></div>
          <div className="flex flex-col justify-end">
            <div className="text-white">
              <span className=" text-[14px]">EP</span>
            </div>
            <div className="text-white">
              <h2 className="text-8xl py-4 font-black">{albumData?.name}</h2>
            </div>
            <div className="flex gap-2 items-center">
              <div className="shadow-xl">
                <img
                  width={32}
                  src={albumData?.images[0]?.url}
                  className="rounded-full"
                />
              </div>
              <div>
                <ul className="text-white flex gap-1">
                  <li className="text-white hover:underline cursor-pointer">
                    {albumData?.artists[0]?.name}
                  </li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">
                    {albumData?.release_date?.substring(0, 4)}
                  </li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">{albumData?.total_tracks}곡,</li>
                  <li className="opacity-65">
                    {hours > 0 ? `${hours}시간 ` : ""}
                    {`${minutes}분 ${seconds}초`}
                  </li>{" "}
                  {/* 총 시간 표시 */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumBanner;
