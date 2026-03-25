import { LOCAL_SONGS } from "../../constants/SONGS.js";
import api from "./api.js";

const dummySongs = [...LOCAL_SONGS];

const songsService = {
  getAllSongs: async () => {
    try {
      const response = await api.get("/songs");
      return response.data;
    } catch (error) {
      console.error("API not ready, using dummy songs:");
      return dummySongs;
    }
  },

  getSongById: async (id) => {
    try {
      const response = await api.get(`/songs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API not ready, using dummy song for id ${id}:`);
      return dummySongs.find((song) => song.id === id);
    }
  },
};

export default songsService;
