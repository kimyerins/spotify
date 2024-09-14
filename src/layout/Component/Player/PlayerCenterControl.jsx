import React, { useState, useEffect } from "react";
import { usePlayTrack, usePauseTrack } from "../../../hooks/Player/usePlayer";
import { useSkipToNext } from "../../../hooks/Player/useSkipToNext";
import { useSkipToPrevious } from "../../../hooks/Player/useSkipToPrev";
import { usePlayerDevices } from "../../../hooks/Player/usePlayerDevices";
import { usePlayerState } from "../../../hooks/Player/usePlayer";
import useSeekBar from "../../../hooks/Player/usePlayerSeek";

const PlayerCenterControl = () => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("spotifyToken")
  );
  const { data: deviceData, refetch: refetchDevices } = usePlayerDevices(token);
  const { data: playerState, refetch: refetchPlayerState } =
    usePlayerState(token);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const playTrackMutation = usePlayTrack(token);
  const pauseTrackMutation = usePauseTrack(token);
  const skipToNextMutation = useSkipToNext(token);
  const skipToPreviousMutation = useSkipToPrevious(token);
  const { position, handleSeekChange, handleSeek } = useSeekBar(token);
  console.log("selectedDeviceId", selectedDeviceId);

  useEffect(() => {
    if (deviceData && deviceData.devices && deviceData.devices.length > 0) {
      setSelectedDeviceId(deviceData.devices[0].id);
    }
  }, [deviceData]);

  const handleNextTrack = () => {
    skipToNextMutation.mutate({ deviceData });
  };

  const handlePreviousTrack = () => {
    skipToPreviousMutation.mutate({ deviceData });
  };

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
    <div>
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
        <input
          type="range"
          min="0"
          max="300000" // 예시로 5분 (300000ms)로 설정
          value={position}
          onChange={handleSeekChange}
          onMouseUp={handleSeek} // 슬라이더를 놓을 때 시크 요청
        />
      </div>
    </div>
  );
};

export default PlayerCenterControl;
