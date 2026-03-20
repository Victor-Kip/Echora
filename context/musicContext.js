import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, useContext, useState } from "react";

const MusicContext = createContext();
export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const playSong = async (song) => {
    try {
      const source =
        typeof song.url === "string" ? { uri: song.url } : song.url;

      setCurrentSong(song);

      player.replace(source);
      player.play();
    } catch (error) {
      console.log(`PlaybackError${error}`);
    }
  };
  const tooglePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying: status.playing,
        playSong,
        tooglePlayPause,
        status,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
export const useMusic = () => useContext(MusicContext);
