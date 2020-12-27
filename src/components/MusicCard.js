import "font-awesome/css/font-awesome.css";
import { useRef, useState, useEffect } from "react";

const MusicCard = ({ song, nextSong, prevSong, mode, setMode }) => {
  const audioRef = useRef(null);
  const timeRef = useRef(null);
  const pp = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState("off");
  const [volume, setVolume] = useState(1);

  const handlePP = () => {
    if (!isPlaying) setAutoPlay(true);
    else setAutoPlay(false);
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = volume;
  };

  const changeSong = (func) => {
    func();
    audioRef.current.load();
  };

  const handleEnd = () => {
    console.log(isPlaying);
    if (mode === "repeat") changeSong(nextSong);
    else if (mode === "no-repeat") setIsPlaying(false);
    console.log(isPlaying);
  };

  const sToM = (n) => {
    n = Math.floor(n);
    var m = Math.floor(n / 60);
    var s = (n % 60).toString().substring(0, 2);
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return m + ":" + s + "  ";
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
          onEnded={handleEnd}
          loop={mode === "loop" ? true : false}
          onTimeUpdate={() => setSongTime(audioRef.current.currentTime)}
          src={song.src}
          ref={audioRef}
        ></audio>
        <div>
          <span>{songTime == 0 ? "--:--" : sToM(songTime)}</span>
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
                  ? 0
                  : audioRef.current.duration
                : 0
            }
            step="any"
          />
          <span>
            {audioRef.current
              ? isNaN(audioRef.current.duration)
                ? "--:--"
                : sToM(audioRef.current.duration)
              : "--:--"}
          </span>
        </div>
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
          <button className="btn">
            <span
              className={
                "fa " + (volume > 0 ? "fa-volume-up" : "fa-volume-down")
              }
            ></span>
            <input
              style={{ transform: "rotate(270deg) translate(-50%, -50%)" }}
              type="range"
              value={volume}
              min={0}
              max={1}
              step={"any"}
              aria-orientation="vertical"
              onInput={(e) => handleVolume(e)}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MusicCard;
