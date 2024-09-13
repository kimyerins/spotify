import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSpotifyToken = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const SCOPES =
    "user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state";

  // 로컬 스토리지에서 기존의 토큰을 가져오거나 null로 초기화
  const [token, setToken] = useState(() => {
    return localStorage.getItem("spotifyToken") || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenFromUrl = hash
        .split("&")
        .find((elem) => elem.startsWith("#access_token"))
        ?.split("=")[1]; // Optional chaining 사용

      if (tokenFromUrl) {
        setToken(tokenFromUrl);
        localStorage.setItem("spotifyToken", tokenFromUrl);
        window.location.hash = ""; // URL의 해시 제거
        navigate("/");
      } else {
        console.error("토큰이 URL에서 발견되지 않음");
      }
    }
  }, [navigate]);

  const login = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    console.log("로그인 URL:", authUrl);
    window.location.href = authUrl;
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("spotifyToken");
  };

  return { token, login, clearToken };
};

export default useSpotifyToken;
