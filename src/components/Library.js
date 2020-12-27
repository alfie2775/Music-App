import SongCard from "./SongCard";
import "../css/library.css";

const Library = (props) => {
  return (
    <div className="container">
      {props.songs.map((song, idx) => (
        <SongCard key={idx} song={song} />
      ))}
    </div>
  );
};

export default Library;
