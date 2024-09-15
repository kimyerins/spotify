import React from "react";

const AlbumBanner = ({ albumData, artistData }) => {
  if (!albumData || !artistData || artistData.length === 0) {
    return null; // 데이터가 없으면 빈 상태로 반환
  }

  // 총 재생시간 구하기 (reduce 사용)
  const total_duration_ms = albumData?.tracks?.items?.reduce(
    (acc, song) => acc + song.duration_ms,
    0
  );

  const seconds = Math.floor((total_duration_ms / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((total_duration_ms / (1000 * 60)) % 60);
  const hours = Math.floor(total_duration_ms / (1000 * 60 * 60));

  return (
    <div className="relative flex justify-center items-center rounded-md w-full flex-grow-1">
      <div className="z-10 flex justify-center items-center rounded-md w-full p-4">
        <div className="z-10 flex gap-6 self-stretch w-full h-full">
          <div
            className="rounded-md w-[232px] h-[232px] bg-cover shadow-custom shadow-xl hover:scale-[102%] transition-all duration-200"
            style={{
              backgroundImage: `url(${albumData?.images?.[0]?.url || ""})`,
            }}
          ></div>
          <div className="flex flex-col justify-end">
            <div className="text-white">
              <span className="text-[14px]">앨범</span>
            </div>
            <div className="text-white">
              <h2
                className={` py-4 font-black ${
                  albumData?.name?.length > 10
                    ? "text-3xl"
                    : albumData?.name?.length > 6
                    ? "text-5xl"
                    : "text-8xl"
                }`}
              >
                {albumData?.name || "No Title"}
              </h2>
            </div>
            <div className="flex gap-2 items-center">
              <div className="shadow-xl">
                {artistData?.images?.[0]?.url ? (
                  <img
                    width={32}
                    src={artistData?.images[1]?.url}
                    className="rounded-full"
                    alt={artistData?.name || "Unknown Artist"}
                  />
                ) : (
                  <div className="w-[32px] h-[32px] bg-gray-400 rounded-full" />
                )}
              </div>
              <div>
                <ul className="text-white flex gap-1">
                  <li className="text-white hover:underline cursor-pointer">
                    {albumData?.artists?.[0]?.name || "Unknown Artist"}
                  </li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">
                    {albumData?.release_date?.substring(0, 4) || "Unknown Date"}
                  </li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">
                    {albumData?.total_tracks || 0}곡,
                  </li>
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
