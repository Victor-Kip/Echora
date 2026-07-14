import { LOCAL_SONGS } from "../../constants/SONGS.js";
import api from "./api.js";

// test songs if backend isnt working
const dummySongs = [...LOCAL_SONGS];

const songsService = {
  //fetch all the songs saved in database
  getAllSongs: async () => {
    try {
      const response = await api.get("/audio");

      return response.data.data || [];
    } catch (error) {
      console.error(error);
      //if not able to fetch,use the locally saved test songs
      return dummySongs;
    }
  },
  //get a specific song in the list of songs
  getSongById: async (id) => {
    try {
      const response = await api.get(`/audio/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Server error: ${error}`);
    }
  },
  //get the songs created bt a specific artist
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
