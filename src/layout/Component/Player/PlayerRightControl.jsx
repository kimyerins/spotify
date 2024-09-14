import React, { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useVolume, useSetVolume } from "../../../hooks/Player/useVolume";
import { usePlayerState } from "../../../hooks/Player/usePlayer";
import { debounce } from "lodash";

const PlayerRightControl = ({
  visibleSection,
  setVisibleSection,
  currentVolume,
}) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("spotifyToken")
  );
  const queryClient = useQueryClient();
  const mutation = useSetVolume();
  const [volume, setVolume] = useState(0);
  const { data: playerState, refetch: refetchPlayerState } =
    usePlayerState(token);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (currentVolume !== undefined) {
      setVolume(currentVolume);
    }
  }, [currentVolume]);

  useEffect(() => {
    updateSliderProgress();
  }, [volume]);

  const debouncedSetVolume = useCallback(
    debounce((newVolume) => {
      mutation.mutate({ token, volume: newVolume });
    }, 500),
    [token, mutation]
  );

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    debouncedSetVolume(newVolume);
  };

  const updateSliderProgress = () => {
    if (sliderRef.current) {
      const progress = volume * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${progress}%, #535353 ${progress}%, #535353 100%)`;
    }
  };
  useEffect(() => {
    if (playerState) {
      queryClient.invalidateQueries("player-queue");
    }
  }, [playerState, queryClient]);

  return (
    <div>
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
            min={0}
            max={100}
            value={volume}
            className="range-slider"
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

export default PlayerRightControl;
