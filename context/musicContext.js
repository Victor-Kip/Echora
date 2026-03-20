import { Audio } from "expo-av";
import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();
export const MusicProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSong = async (song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const source =
        typeof song.url === "string" ? { uri: song.url } : song.url;
      const { sound: newSound } = await Audio.Sound.createAsync(source, {
        shouldPlay: true,
      });

      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (error) {
      console.log(`PlaybackError${error}`);
    }
  };
  const tooglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) await sound.pauseAsync();
    else await sound.playAsync();
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider
      value={{ currentSong, isPlaying, playSong, tooglePlayPause }}
    >
      {children}
    </MusicContext.Provider>
  );
};
export const useMusic = () => useContext(MusicContext);
