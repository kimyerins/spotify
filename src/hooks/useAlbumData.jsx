import axios from "axios";

function useAlbumData(token, albumId) {
  const fetchAlbum = async () => {
    if (!token || !albumId) return null;

    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching album:", error);
      return null;
    }
  };

  return { fetchAlbum };
}

export default useAlbumData;
