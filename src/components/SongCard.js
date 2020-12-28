const SongCard = (props) => {
  return (
    <div
      className="row library-row"
      onClick={() => props.selectSong(props.idx)}
    >
      <div className="col-2">
        <img
          className="library-img"
          src={props.song.img}
          alt={props.song.name}
        />
      </div>
      <div className="col-10 align-self-center justify-content-start">
        <h6 className="song-card-title">{props.song.name}</h6>
        <p className="song-card-text">{props.song.singer}</p>
      </div>
    </div>
  );
};

export default SongCard;
