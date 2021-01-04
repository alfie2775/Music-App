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
  const slider = useRef(null);
  const mc = useRef(null);
  const slider2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openLibrary = () => {
    slider.current.classList.toggle("slide");
    slider2.current.classList.toggle("slide2");
    slider.current.classList.toggle("slide-");
    slider2.current.classList.toggle("slide-");
  };

  const selectSong = (idx) => {
    setcurrentSongIndex(idx);
  };

  return (
    <>
      <div className="container">
        <Navigation openLibrary={openLibrary} />
      </div>
      <div id="slider" className="slide-" ref={slider}>
        <div className="mc" ref={mc}>
          <MusicCard
            mode={mode}
            setMode={setMode}
            song={songs[currentSongIndex]}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            nextSong={() =>
              setcurrentSongIndex((currentSongIndex + 1) % songs.length)
            }
            prevSong={() => {
              var x = currentSongIndex - 1;
              if (x === -1) x = songs.length - 1;
              setcurrentSongIndex(x);
            }}
          />
          <div className="alfie">
            <p>
              Made by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                className="link-to-alfie"
                href="https://tarunalfie.netlify.app"
              >
                Alfie
              </a>
            </p>
          </div>
        </div>
        <div className="lib slide-" ref={slider2}>
          <button
            className="btn"
            onClick={openLibrary}
            style={{ marginLeft: "2%" }}
          >
            <span className="fa fa-close fa-lg"></span>
          </button>
          <Library
            songs={songs}
            selectSong={selectSong}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
