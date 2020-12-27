import { useRef, useState } from "react";
import Navigation from "./Navigation.js";
import MusicCard from "./MusicCard";
import Library from "./Library";
import "bootstrap/dist/css/bootstrap.css";
import { SONGS } from "../music-library/songs";
import "../css/musicplayer.css";

const MusicPlayer = () => {
  const [songs] = useState(SONGS);
  const [currentSongIndex, setcurrentSongIndex] = useState(0);
  const [mode, setMode] = useState("repeat");

  return (
    <div className="container">
      <Navigation />
      <Library songs={songs} />
      <p>This is a test</p>
      <MusicCard
        mode={mode}
        setMode={setMode}
        song={songs[currentSongIndex]}
        nextSong={() =>
          setcurrentSongIndex((currentSongIndex + 1) % songs.length)
        }
        prevSong={() => {
          var x = currentSongIndex - 1;
          if (x == -1) x = songs.length - 1;
          setcurrentSongIndex(x);
        }}
      />
    </div>
  );
};

export default MusicPlayer;
