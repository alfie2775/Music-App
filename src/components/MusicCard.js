import "font-awesome/css/font-awesome.css";
import { useRef, useState, useEffect } from "react";
import "../css/musiccard.css";
import React from "react";
import "react-dom";
import ReactTooltip from "react-tooltip";

const MusicCard = ({
  song,
  nextSong,
  prevSong,
  mode,
  setMode,
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = useRef(null);
  const timeRef = useRef(null);
  const pp = useRef(null);
  const [songTime, setSongTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
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
    return m + ":" + s;
  };

  const changeMode = () => {
    if (mode === "repeat") setMode("loop");
    else if (mode === "loop") setMode("no-repeat");
    else setMode("repeat");
  };

  if (audioRef.current || (false && isPlaying)) {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }

  return (
    <div className="row justify-content-center" style={{ height: "100%" }}>
      <div className="card d-flex m-5">
        <h5 className="card-title text-center mt-3">{song.name}</h5>
        <img src={song.img} alt={song.name} className="card-img" />
        <h6 className="card-title text-center mt-3">{song.singer}</h6>
        <div className="card-body justify-content-center">
          <audio
            autoPlay={autoPlay}
            onEnded={handleEnd}
            loop={mode === "loop" ? true : false}
            onTimeUpdate={() => setSongTime(audioRef.current.currentTime)}
            src={song.src}
            ref={audioRef}
            preload="auto"
          ></audio>
          <div className="time-stamps">
            <span className="col-2 timestamp">
              {songTime === 0 ? "00:00" : sToM(songTime)}
            </span>
            <span className="col-8">
              <input
                className="time-stamp"
                ref={timeRef}
                onInput={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  console.log(e.target.value);
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
            </span>
            <span className="col-2 timestamp">
              {audioRef.current
                ? isNaN(audioRef.current.duration)
                  ? "00:00"
                  : sToM(audioRef.current.duration)
                : "00:00"}
            </span>
          </div>
          <div className="controls mt-2 mb-1">
            <div className="row justify-content-center mb-2">
              <div className="col-7">
                <button
                  className="btn"
                  onClick={() => {
                    if (songTime <= 3) changeSong(prevSong);
                    else audioRef.current.currentTime = 0;
                  }}
                >
                  <span className="fa fa-step-backward"></span>
                </button>
                <button className="btn btn-success pp" onClick={handlePP}>
                  <span
                    ref={pp}
                    className={"fa " + (isPlaying ? "fa-pause" : "fa-play")}
                  ></span>
                </button>

                <button
                  className="btn btn"
                  onClick={() => changeSong(nextSong)}
                >
                  <span className="fa fa-step-forward"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-7 d-flex">
              <button className="btn">
                <a href={song.src} download={song.name}>
                  <span className="fa fa-download"></span>
                </a>
              </button>

              <div className="drop-down" data-tip data-for="volume">
                <button className="btn" id="volumeDropDown">
                  <span
                    className={
                      "fa " + (volume > 0 ? "fa-volume-up" : "fa-volume-off")
                    }
                  ></span>
                </button>
                <input
                  className="volume-dropdown pt-1"
                  data-tip
                  data-for="volume"
                  type="range"
                  value={volume}
                  min={0}
                  max={1}
                  step={"any"}
                  aria-orientation="vertical"
                  onInput={(e) => handleVolume(e)}
                />
              </div>
              <button
                className="btn"
                onClick={changeMode}
                data-tip
                data-for="mode"
              >
                <span
                  style={{
                    transform: "scaleX(-1) rotate(-30deg)",
                    color: mode === "no-repeat" ? "grey" : "green",
                  }}
                  className={
                    "fa fa-undo " + (mode === "no-repeat" ? "grey-" : "green-")
                  }
                ></span>
                <sub style={{ color: "lightgreen", fontWeight: "bold" }}>
                  {mode === "loop" ? " 1" : ""}
                </sub>
              </button>
              <ReactTooltip effect="solid" id="mode" place="bottom">
                <span style={{ textTransform: "capitalize" }}>
                  {"on " + mode}
                </span>
              </ReactTooltip>
              <ReactTooltip effect="solid" id="volume">
                <span>{parseInt(volume * 100) + "%"}</span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MusicCard;
