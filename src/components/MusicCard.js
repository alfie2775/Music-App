import "font-awesome/css/font-awesome.css";
import { useRef, useState, useEffect } from "react";

const MusicCard = ({ song, nextSong, prevSong }) => {
  const audioRef = useRef(null);
  const timeRef = useRef(null);
  const pp = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState("off");

  const handlePP = () => {
    if (isPlaying) setAutoPlay(true);
    else setAutoPlay(false);
    setIsPlaying(!isPlaying);
  };

  const changeSong = (func) => {
    func();
  };

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="card">
      <h5 className="card-title">{song.name}</h5>
      <img src={song.img} alt={song.name} className="card-img" />
      <div className="card-body">
        <audio
          autoPlay={autoPlay}
          onChange={() => setIsPlaying(false)}
          controls
          onTimeUpdate={() => setSongTime(audioRef.current.currentTime)}
          src={song.src}
          ref={audioRef}
        ></audio>
        <input
          ref={timeRef}
          onInput={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
          type="range"
          min={0}
          value={songTime}
          max={
            audioRef.current
              ? isNaN(audioRef.current.duration)
                ? 1000
                : audioRef.current.duration
              : 1000
          }
          step="any"
        />
        <div className="controls">
          <button className="btn btn" onClick={() => changeSong(prevSong)}>
            <span className="fa fa-backward"></span>
          </button>
          <button className="btn btn-success" onClick={handlePP}>
            <span
              ref={pp}
              className={"fa fa-lg " + (isPlaying ? "fa-pause" : "fa-play")}
            ></span>
          </button>
          <button className="btn btn" onClick={() => changeSong(nextSong)}>
            <span className="fa fa-forward"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MusicCard;
