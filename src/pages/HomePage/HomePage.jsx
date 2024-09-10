import React, { useState } from "react";
import { useArtistSearchQuery } from "../../hooks/useArtistSearch";

const HomePage = () => {
  const token = localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const {
    data: artists,
    isLoading,
    error,
  } = useArtistSearchQuery(token, searchKey);
  console.log("artists", artists);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKey(e.target.elements.search.value);
  };

  const renderArtists = () => {
    return artists?.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt={artist.name} />
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
        <h1 className="text-white">Artist Search</h1>

        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search for an artist" />
          <button type="submit">Search</button>
        </form>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching artists: {error.message}</p>}
        {renderArtists()}
      </header>
    </div>
  );
};

export default HomePage;
