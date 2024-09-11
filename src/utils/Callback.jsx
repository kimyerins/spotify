import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const TOKEN_REFRESH_INTERVAL = 50 * 60 * 1000; // 50 minutes in milliseconds

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let _token = localStorage.getItem("token");

    if (!_token && hash) {
      _token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      localStorage.setItem("token", _token);
    }

    setToken(_token);

    if (_token) {
      navigate("/"); // 아티스트 검색 페이지로 리디렉션
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
      }, TOKEN_REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/"); // 로그아웃 후 홈으로 돌아가기
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white">Spotify React</h1>
        {!token ? (
          <a
            className="text-white"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button className="text-white" onClick={logout}>
            Logout
          </button>
        )}
      </header>
    </div>
  );
}

export default Callback;
