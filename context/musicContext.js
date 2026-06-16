import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, useContext, useEffect, useState } from "react";
import songsService from "../app/services/songsService.js";
import { useAuth } from "./auth.js";

const MusicContext = createContext();
export const MusicProvider = ({ children }) => {
  const { role } = useAuth();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playBackMode, setPlayBackMode] = useState("sequential"); // 'repeat', 'shuffle', 'normal'
  const [isLoading, setIsLoading] = useState(true);
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const loadSongs = async () => {
    setIsLoading(true);
    try {
      let data;
      if (role == "artist") {
        data = await songsService.getSongsByArtist(2);
      } else {
        data = await songsService.getAllSongs();
      }
      setSongs(data);
    } catch (error) {
      console.error("Failed to load songs:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadSongs();
  }, [role]);

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
        const randomIndex = Math.floor(Math.random() * songs.length);
        playSong(songs[randomIndex]);
      } else {
        playNext();
      }
    }
  }, [status.currentTime, status.duration, playBackMode]);
  const playSong = async (song) => {
    if (!song) return;
    const audioPath = song.url || song.audioURL;
    if (!audioPath) {
      console.error(`No path found for ${song.name}`);
      return;
    }
    try {
      let source;
      if (typeof audioPath === "string") {
        const fullUrl = audioPath.startsWith("/")
          ? `http://192.168.1.15:5000${audioPath}`
          : audioPath;
        source = { uri: fullUrl };
      } else {
        source = audioPath;
      }
      setCurrentSong(song);
      player.replace(source);
      player.play();
    } catch (error) {
      console.log(`PlaybackError${error}`);
    }
  };
  const playNext = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };
  const playPrevious = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[previousIndex]);
  };
  const tooglePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };
  const stopPlayback = () => {
    player.pause();
    setCurrentSong(null);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        stopPlayback,
        isPlaying: status.playing,
        playSong,
        tooglePlayPause,
        playNext,
        playPrevious,
        status,
        player,
        togglePlaybackMode,
        playBackMode,
        songs,
        isLoading,
        refreshSongs: loadSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
export const useMusic = () => useContext(MusicContext);
