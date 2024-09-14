import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePlayerDevices } from "../../hooks/Player/usePlayerDevices";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import {
  usePlayerState,
  usePlayTrack,
  usePauseTrack,
} from "../../hooks/Player/usePlayer";
import { useSkipToNext } from "../../hooks/Player/useSkipToNext";
import { useSkipToPrevious } from "../../hooks/Player/useSkipToPrev";
import { useVolume, useSetVolume } from "../../hooks/Player/useVolume";
import { usePlayerQueue } from "../../hooks/Player/userPlayerPlaying";
import { debounce } from "lodash";
import "./Player.css";

const PlayerControl = ({ visibleSection, setVisibleSection }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() =>
    localStorage.getItem("spotifyToken")
  );
  const { data: deviceData, refetch: refetchDevices } = usePlayerDevices(token);
  const { data: playerState, refetch: refetchPlayerState } =
    usePlayerState(token);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const playTrackMutation = usePlayTrack(token);
  const pauseTrackMutation = usePauseTrack(token);
  const { data: currentVolume } = useVolume(token);
  const mutation = useSetVolume();
  const [volume, setVolume] = useState(0);
  console.log("volume", volume);
  const skipToNextMutation = useSkipToNext(token);
  const skipToPreviousMutation = useSkipToPrevious(token);
  const queueQuery = usePlayerQueue(token);

  useEffect(() => {
    if (currentVolume !== undefined) {
      setVolume(currentVolume);
    }
  }, [currentVolume]);

  const debouncedSetVolume = useCallback(
    debounce((newVolume) => {
      mutation.mutate({ token, volume: newVolume });
    }, 500),
    [token]
  );

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    debouncedSetVolume(newVolume);
  };

  const handleNextTrack = () => {
    skipToNextMutation.mutate({ deviceData });
  };

  const handlePreviousTrack = () => {
    skipToPreviousMutation.mutate({ deviceData });
  };

  useEffect(() => {
    if (deviceData && deviceData.devices && deviceData.devices.length > 0) {
      setSelectedDeviceId(deviceData.devices[0].id);
    }
  }, [deviceData]);
  useEffect(() => {
    const refreshDevicesInterval = setInterval(() => {
      refetchDevices();
    }, 10000); // 10초마다 디바이스 목록 갱신
    return () => clearInterval(refreshDevicesInterval);
  }, [refetchDevices]);
  useEffect(() => {
    if (playerState) {
      queryClient.invalidateQueries("player-queue");
    }
  }, [playerState, queryClient]);

  if (!playerState) {
    console.log("현재 재생중인 곡이 없습니다.");
  }
  const handlePlayPause = async () => {
    console.log("현재 플레이어 상태:", playerState);
    if (!token || !selectedDeviceId) {
      console.log("토큰 또는 선택된 디바이스가 없습니다.");
      await refetchDevices();
      return;
    }

    try {
      if (playerState?.is_playing) {
        // 현재 재생 중이면 일시정지
        const result = await pauseTrackMutation.mutateAsync({
          deviceData: selectedDeviceId,
        });
        console.log("일시정지 결과:", result);
      } else {
        // 현재 일시정지 상태이면 재생
        const context = playerState?.context;
        const currentTrack = playerState?.item;
        const progress = playerState?.progress_ms || 0;
        let playParams = {
          position_ms: progress,
        };

        if (context && context.uri) {
          // 컨텍스트(플레이리스트, 앨범 등)가 있는 경우
          playParams.context_uri = context.uri;
          if (currentTrack && currentTrack.uri) {
            playParams.offset = { uri: currentTrack.uri };
          }
        } else if (currentTrack && currentTrack.uri) {
          // 단일 트랙인 경우
          playParams.uris = [currentTrack.uri];
        } else {
          console.error("재생할 수 있는 트랙이 없습니다.");
          return;
        }

        const playResult = await playTrackMutation.mutateAsync({
          token,
          deviceData: selectedDeviceId,
          ...playParams,
        });
        console.log("재생 시작", {
          deviceData: selectedDeviceId,
          ...playParams,
        });
        console.log("재생 결과:", playResult);
      }

      // 플레이어 상태 갱신
      setTimeout(() => {
        refetchPlayerState();
      }, 500); // 500ms 후에 상태 갱신
    } catch (error) {
      console.error("재생/일시정지 중 오류 발생:", error);
    }
  };

  return (
    <div className="control fixed left-0 bottom-0 w-full h-[72px] z-2 bg-[#000] px-[8px] flex justify-between items-center">
      <div className="music_wrap flex items-center">
        <div className="album rounded-[5px] overflow-hidden w-[56px] h-[56x] mr-[8px]">
          <img src={playerState?.item.album.images[0]?.url} alt="album image" />
        </div>
        <div className="txts mx-[8px]">
          <p className="text-white text-[14px]">{playerState?.item.name}</p>
          <p className="text-[#b3b3b3] text-[12px]">
            {playerState?.item.artists[0].name}
          </p>
        </div>
        <div className="add btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        </div>
      </div>
      <div className="control_wrap flex items-center">
        <div className="shuffle btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
            <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
          </svg>
        </div>
        <div onClick={handlePreviousTrack} className="prev btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
          </svg>
        </div>
        <div
          onClick={handlePlayPause}
          className="playPause p-[8px] mx-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#fff]"
        >
          {playerState?.is_playing ? (
            <div className="pause">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
                fill={"#000"}
              >
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            </div>
          ) : (
            <div className="play">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
                fill={"#000"}
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            </div>
          )}
        </div>
        <div onClick={handleNextTrack} className="next btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
          </svg>
        </div>
        <div className="repeat btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
          </svg>
        </div>
      </div>
      <div className="icon_wrap flex items-center">
        <div className="npv btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M11.196 8 6 5v6l5.196-3z"></path>
            <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"></path>
          </svg>
        </div>
        <div className="lyrics btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path>
          </svg>
        </div>
        <div
          className={`queue btn p-[8px] ${
            visibleSection === "playlist" ? "active" : ""
          }`}
          onClick={() => setVisibleSection("playlist")}
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
          </svg>
        </div>
        <div
          className={`tertiary btn p-[8px] ${
            visibleSection === "device" ? "active" : ""
          }`}
          onClick={() => setVisibleSection("device")}
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M2 3.75C2 2.784 2.784 2 3.75 2h8.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 12.25 12h-8.5A1.75 1.75 0 0 1 2 10.25v-6.5zm1.75-.25a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25h-8.5zM.25 15.25A.75.75 0 0 1 1 14.5h14a.75.75 0 0 1 0 1.5H1a.75.75 0 0 1-.75-.75z"></path>
          </svg>
        </div>
        <div className="volume p-[8px]">
          <svg
            data-encore-id="icon"
            role="presentation"
            aria-label="볼륨 높음"
            aria-hidden="true"
            id="volume-icon"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 kcUFwU w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
          </svg>
        </div>
        <div className="volume-bar mr-[8px]">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div className="miniPlay btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16V2.45z"></path>
            <path d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75h5.925z"></path>
          </svg>
        </div>
        <div className="fullScreen btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PlayerControl;
