import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePlayerDevices } from "../../../hooks/Player/usePlayerDevices";
import { usePlayerState } from "../../../hooks/Player/usePlayer";
import { useVolume, useSetVolume } from "../../../hooks/Player/useVolume";
import PlayerAlbum from "./PlayerAlbum";
import PlayerCenterControl from "./PlayerCenterControl";
import PlayerRightControl from "./PlayerRightControl";
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
  const { data: currentVolume } = useVolume(token);

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
  return (
    <div className="control fixed left-0 bottom-0 w-full h-[72px] z-2 bg-[#000] px-[8px] flex justify-between items-center">
      <PlayerAlbum token={token} playerState={playerState} />
      <PlayerCenterControl
        selectedDeviceId={selectedDeviceId}
        deviceData={deviceData}
        refetchDevices={refetchDevices}
        playerState={playerState}
        refetchPlayerState={refetchPlayerState}
      />
      <PlayerRightControl
        currentVolume={currentVolume}
        visibleSection={visibleSection}
        setVisibleSection={setVisibleSection}
      />
    </div>
  );
};

export default PlayerControl;
