import SongCard from "./SongCard";
import "../css/library.css";

const Library = (props) => {
  return (
    <div className="library-container">
      <h3 className="lib-heading">Music Library</h3>
      <div className="library"></div>
      <div className="music-list">
        {props.songs.map((song, idx) => (
          <SongCard
            key={idx}
            idx={idx}
            song={song}
            selectSong={props.selectSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
