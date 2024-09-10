import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Callback() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const TOKEN_REFRESH_INTERVAL = 50 * 60 * 1000; // 50 minutes in milliseconds

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

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
      navigate("/"); // 홈으로 리디렉션
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        // 새로고침을 위해 간단히 페이지를 다시 로드
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
      }, TOKEN_REFRESH_INTERVAL);

      return () => clearInterval(interval); // 컴포넌트가 언마운트 될 때 인터벌 클리어
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
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

        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <h2 className="text-white">Please login</h2>
        )}

        {renderArtists()}
      </header>
    </div>
  );
}

export default Callback;
