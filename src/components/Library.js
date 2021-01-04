import SongCard from "./SongCard";
import "../css/library.css";

const Library = (props) => {
  return (
    <div className="library-container">
      <div className="library"></div>
      <div className="music-list">
        {props.songs.map((song, idx) => (
          <SongCard
            key={idx}
            idx={idx}
            song={song}
            currentSongIndex={props.currentSongIndex}
            selectSong={props.selectSong}
            isPlaying={props.isPlaying}
            setIsPlaying={props.setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
