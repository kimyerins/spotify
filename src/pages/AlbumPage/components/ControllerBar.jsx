import PlayButton from "../../../assets/images/PlayButton.svg?react";
import { useState } from "react";
import AddButton from "../../../assets/images/AddButton.svg?react";
import RadioButton from "../../../assets/images/RadioButton.svg?react";
import AddPlayButton from "../../../assets/images/AddPlayButton.svg?react";
import ViewOptionBox from "./ViewOptionBox";
import { useAlbumLibrary } from "../../../hooks/useAlbumLibrary";
import RemoveButton from "../../../assets/images/RemoveButton.svg?react";
import { usePlayerDevices } from "../../../hooks/Player/usePlayerDevices";
import {
  usePlayerState,
  usePlayTrack,
  usePauseTrack,
} from "../../../hooks/Player/usePlayer";
import { useAlbumTracks } from "../../../hooks/useAlbumTracks";

const ControllerBar = ({ viewOptionBox, id }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false); // 옵션이 열려있는지 여부
  const [isViewOptionOpen, setIsViewOptionOpen] = useState(false); // 보기 옵션이 열려있는지 여부
  const { viewOption, setViewOption } = viewOptionBox;
  const viewOptionState = {
    viewOption: viewOption,
    setViewOption: setViewOption,
  };

  const token = localStorage.getItem("spotifyToken");
  const albumId = id; // 실제 앨범 ID로 설정
  const {
    isSaved, // 저장 여부
    isCheckingSaved, // 확인 중 로딩 상태
    isSaving, // 저장 중인지
    isRemoving, // 제거 중인지
    saveAlbum, // 앨범 저장 함수
    removeAlbum, // 앨범 삭제 함수
  } = useAlbumLibrary(token, albumId);

  const { data: deviceId, refetch: refetchDevices } = usePlayerDevices(token);
  const device_id = deviceId?.devices[0].id;
  const { data: playerState } = usePlayerState(token); // 현재 플레이어 상태 조회
  const { mutate: playTrack } = usePlayTrack();
  // const { mutate: pauseTrack } = usePauseTrack();
  const pauseTrackMutation = usePauseTrack(token);
  const { data: trackList } = useAlbumTracks(albumId);
  console.log("라이브러리 저장여부 : ", isSaved);
  console.log("디바이스 ID : ", device_id);
  console.log("재생중? : ", playerState?.is_playing);
  console.log("트랙리스트 : ", trackList);
  const trackUris = trackList?.map((track) => `spotify:track:${track.id}`);
  console.log("트랙ID리스트 : ", trackUris);

  const handlePlay = () => {
    playTrack({
      token,
      uris: trackUris, // 트랙은 노래 한곡인듯
      deviceData: `${device_id}`, // 실제 장치 ID로 대체
    });
  };

  // const handlePause = () => {
  //   pauseTrack({
  //     token,
  //   });
  // };
  const handlePlayPause = async () => {
    console.log("현재 플레이어 상태:", playerState);
    if (!token) {
      console.log("토큰 또는 선택된 디바이스가 없습니다.");
      await refetchDevices();
      return;
    }

    try {
      if (playerState?.is_playing) {
        // 현재 재생 중이면 일시정지
        const result = await pauseTrackMutation.mutateAsync({
          deviceData: device_id,
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
          deviceData: device_id,
          ...playParams,
        });
        console.log("재생 시작", {
          deviceData: device_id,
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
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-4">
        {/* 재생 버튼 */}

        {playerState?.is_playing ? (
          <div className="cursor-pointer" onClick={handlePlayPause}>
            <svg
              className="w-[56px] h-[56px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="#1ED760"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handlePlay}>
            <PlayButton
              width={56}
              height={56}
              fill="#1ED760"
              className=" hover:scale-105 hover:fill-[#3AE276]"
            />
          </div>
        )}

        {isSaved ? (
          <div
            className="cursor-pointer "
            onClick={() => removeAlbum()} // 앨범 제거
            disabled={isRemoving}
          >
            <RemoveButton
              color="#3AE276"
              className={`w-9 h-9 hover:scale-105`}
            />
          </div>
        ) : (
          <div
            className="cursor-pointer "
            onClick={() => saveAlbum()} // 앨범 저장
            disabled={isSaving}
          >
            <svg
              className="w-9 h-9 text-[#b3b3b3]  hover:text-white hover:scale-[104%] dark:text-white "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={56}
              height={56}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )}

        {/* 옵션 버튼 */}
        <div
          className="cursor-pointer relative"
          onClick={() => {
            setIsOptionOpen(!isOptionOpen);
          }}
        >
          <svg
            class="w-9 h-9 text-[#b3b3b3]  hover:text-white hover:scale-105 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="3"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
          {/* 옵션 메뉴 */}

          {isOptionOpen && (
            <div className="z-10 absolute  rounded-md w-[220px] p-1 bg-[#282828]">
              <ul className="text-white text-sm font-semibold tracking-tighter opacity-80 rounded-md">
                <li className="py-3 pl-3 pr-2 flex items-center gap-3 rounded-sm hover:bg-[#3E3D3D]">
                  <AddButton width={18} height={18} color="white" />
                  <span>내 라이브러리에 추가하기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <RadioButton width={16} height={16} color="white" />
                  <span>아티스트 라디오 보러가기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <AddPlayButton width={16} height={16} color="white" />
                  <span>재생목록에 추가하기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  justify-between rounded-sm  border-t border-[#3E3D3D] hover:bg-[#3E3D3D]">
                  <div className="flex gap-2 items-center">
                    <svg
                      className="w-5 h-5 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                    <span>플레이리스트에 추가하기</span>
                  </div>
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={"w-4 h-4 rotate-90"}
                    fill="hsla(0,0%,100%,.9)"
                  >
                    <path d="M14 10 8 4l-6 6h12z" />
                  </svg>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-2 items-center justify-between  rounded-sm  border-y border-[#3E3D3D] hover:bg-[#3E3D3D]">
                  <div className="flex gap-3 items-center ">
                    <svg
                      className="w-4 h-4 text-white dark:text-white "
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="#fff"
                    >
                      <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z" />
                      <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z" />
                    </svg>
                    <span>공유</span>
                  </div>
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={"w-4 h-4 rotate-90"}
                    fill="hsla(0,0%,100%,.9)"
                  >
                    <path d="M14 10 8 4l-6 6h12z" />
                  </svg>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <svg
                    className="w-4 h-4 text-white dark:text-white "
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="#fff"
                  >
                    <path d="M8.319.006A8.003 8.003 0 0 0 .006 7.683a7.998 7.998 0 0 0 7.677 8.31A8 8 0 0 0 8.319.006Zm3.377 11.72a.478.478 0 0 1-.652.179 9.612 9.612 0 0 0-3.426-1.165 9.599 9.599 0 0 0-3.613.176.479.479 0 0 1-.226-.93c1.3-.316 2.637-.38 3.972-.193 1.336.188 2.602.62 3.765 1.28.228.13.309.422.178.652l.002.001Zm1.05-2.1a.62.62 0 0 1-.841.25A11.793 11.793 0 0 0 7.923 8.57a11.775 11.775 0 0 0-4.188.158.622.622 0 0 1-.74-.473.62.62 0 0 1 .473-.739 13.032 13.032 0 0 1 4.626-.176c1.552.217 3.031.704 4.4 1.444a.62.62 0 0 1 .25.842h.003Zm1.166-2.367a.765.765 0 0 1-1.031.326 14.307 14.307 0 0 0-4.612-1.473 14.285 14.285 0 0 0-4.84.145.764.764 0 1 1-.303-1.499 15.812 15.812 0 0 1 5.356-.16c1.791.252 3.51.8 5.104 1.63.374.194.52.656.326 1.03Z" />
                  </svg>
                  <span>데스크탑에서 열기</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* 보기옵션 */}
      <div
        className="text-[#b3b3b3] text-sm flex items-center gap-1 cursor-pointer group "
        onClick={() => {
          setIsViewOptionOpen(!isViewOptionOpen);
        }}
      >
        {viewOption == "small" ? (
          <div className="flex items-center gap-1 relative">
            <span className="group-hover:text-white">작게</span>
            {/* 햄버거버튼 */}
            <svg
              class="w-6 h-6 text-[#b3b3b3]  dark:text-white  group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
            {isViewOptionOpen && (
              <div className="absolute bottom-0 right-0">
                <ViewOptionBox viewOptionState={viewOptionState} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 relative">
            <span className="group-hover:text-white">목록</span>
            {/* 리스트버튼 */}
            <svg
              class="w-7 h-7 text-[#b3b3b3]  dark:text-white   group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
              />
            </svg>
            {isViewOptionOpen && (
              <div className="absolute bottom-0 right-0">
                <ViewOptionBox viewOptionState={viewOptionState} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ControllerBar;
