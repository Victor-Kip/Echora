import { LOCAL_SONGS } from "../../constants/SONGS.js";
import api from "./api.js";

const dummySongs = [...LOCAL_SONGS];

const songsService = {
  getAllSongs: async () => {
    try {
      const response = await api.get("/audio");

      return response.data.data || [];
    } catch (error) {
      console.error(error);
      return dummySongs;
    }
  },

  getSongById: async (id) => {
    try {
      const response = await api.get(`/audio/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API not ready, using dummy song for id ${id}:`);
      return dummySongs.find((song) => song.id === id);
    }
  },
  getSongsByArtist: async (artistId) => {
    try {
      const response = await api.get(`/audio/artist/${artistId}`);
      console.log(`Retrieved artist's songs ${response.data.data}`);
      return response.data.data;
    } catch (error) {
      console.error(`An error occured ${error}`);
    }
  },
};

export default songsService;
