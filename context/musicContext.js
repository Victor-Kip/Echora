import { LOCAL_SONGS } from "@/constants/SONGS";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();
export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playBackMode, setPlayBackMode] = useState("sequential"); // 'repeat', 'shuffle', 'normal'

  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const togglePlaybackMode = () => {
    setPlayBackMode((prevMode) => {
      if (prevMode === "sequential") return "shuffle";
      if (prevMode === "shuffle") return "repeat";
      return "sequential";
    });
  };

  useEffect(() => {
    if (status.duration > 0 && status.currentTime >= status.duration - 1) {
      if (playBackMode === "repeat") {
        player.seekTo(0);
        player.play();
      } else if (playBackMode === "shuffle") {
        const randomIndex = Math.floor(Math.random() * LOCAL_SONGS.length);
        playSong(LOCAL_SONGS[randomIndex]);
      } else {
        playNext();
      }
    }
  }, [status.currentTime, status.duration, playBackMode]);
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
  const playNext = () => {
    const currentIndex = LOCAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % LOCAL_SONGS.length;
    playSong(LOCAL_SONGS[nextIndex]);
  };
  const playPrevious = () => {
    const currentIndex = LOCAL_SONGS.findIndex((s) => s.id === currentSong.id);
    const previousIndex =
      (currentIndex - 1 + LOCAL_SONGS.length) % LOCAL_SONGS.length;
    playSong(LOCAL_SONGS[previousIndex]);
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
        playNext,
        playPrevious,
        status,
        player,
        togglePlaybackMode,
        playBackMode,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
export const useMusic = () => useContext(MusicContext);
