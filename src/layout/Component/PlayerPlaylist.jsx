import React, { useState, useEffect } from "react";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import {
  usePlayerPlaying,
  usePlayerQueue,
} from "../../hooks/Player/userPlayerPlaying";
import { usePlayerDevices } from "../../hooks/Player/usePlayerDevices";

const PlayerPlaylist = ({ visibleSection }) => {
  const { token } = useSpotifyToken();
  const playlistQuery = usePlayerPlaying(token);
  const devicesQuery = usePlayerDevices(token);
  const queueQuery = usePlayerQueue(token);
  const activeDevice = devicesQuery.data?.devices?.find(
    (device) => device.is_active
  );
  console.log("queueQuery", queueQuery);
  console.log("devicesQuery", devicesQuery);
  console.log("activeDevice", activeDevice);

  useEffect(() => {
    if (visibleSection === "playlist") {
      playlistQuery.refetch();
    } else if (visibleSection === "device") {
      devicesQuery.refetch();
    }
  }, [visibleSection, playlistQuery, devicesQuery]);

  useEffect(() => {
    queueQuery.refetch(); // 컴포넌트가 마운트될 때 데이터 Fetch
  }, [queueQuery]);

  if (queueQuery.isError) {
    console.error("Error fetching queue: ", queueQuery.error.message);
  }

  if (devicesQuery.isError) {
    console.error("Error fetching devices: ", devicesQuery.error.message);
  }

  return (
    <div className="h-[calc(100vh-140px)] min-w-[320px] mx-2 bg-[#121212] rounded-[10px] overflow-y-scroll">
      {visibleSection === "playlist" && (
        <div className="playingBox">
          <div className="tit_wrap px-[16px]">
            <div className="flex justify-between items-center py-[8px]">
              <h3 className="text-white text-[16px] font-bold">재생목록</h3>
              <div className="p-[8px]">
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
                  fill={"#b3b3b3"}
                >
                  <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
              </div>
            </div>
          </div>
          {queueQuery?.data?.queue ? (
            <div className="p-[16px]">
              <h3 className="text-white">현재 재생 중</h3>
              <div className="flex p-[8px] mb-[24px]">
                <div className="imgbox min-w-[48px] min-w-[48px]  max-w-[48px] max-w-[48px] mr-[8px]">
                  <img
                    className="rounded-[5px]"
                    src={
                      queueQuery?.data?.currently_playing?.album?.images?.[0]
                        ?.url
                    }
                    alt={queueQuery?.data?.currently_playing?.name}
                  />
                </div>
                <div className="txtbox">
                  <h5 className="text-white text-[16px]">
                    {queueQuery?.data?.currently_playing?.name}
                  </h5>
                  <p className="text-[14px] text-[#b3b3b3]">
                    {queueQuery?.data?.currently_playing?.artists?.[0]?.name}
                  </p>
                </div>
              </div>
              <h3 className="text-white">다음 곡들</h3>
              <ul>
                {queueQuery?.data.queue.slice(0, 12).map((track, index) => (
                  <li key={index} className="text-white flex p-[8px]">
                    <div className="imgbox min-w-[48px] min-w-[48px]  max-w-[48px] max-w-[48px] mr-[8px]">
                      <img
                        className="rounded-[5px]"
                        src={track?.album?.images?.[0]?.url}
                        alt={track?.name}
                      />
                    </div>
                    <div className="txtbox">
                      <h5 className="text-white text-[16px]">{track?.name}</h5>
                      <p className="text-[14px] text-[#b3b3b3]">
                        {track?.artists?.[0]?.name}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>트랙 정보가 없습니다.</p>
          )}
        </div>
      )}
      {visibleSection === "device" && (
        <div className="devicesBox">
          {devicesQuery?.data && (
            <div>
              <div className="tit_wrap px-[16px]">
                <div className="flex justify-between items-center py-[8px]">
                  <h3 className="text-white text-[16px] font-bold">
                    기기에 연결하기
                  </h3>
                  <div className="p-[8px]">
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
                      fill={"#b3b3b3"}
                    >
                      <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="cont_wrap">
                <h3 className="text-white text-[24px]">현재 기기</h3>
                <p className="text-white text-[16px]">{activeDevice?.name}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerPlaylist;
