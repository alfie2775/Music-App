const SongCard = ({ song }) => {
  return (
    <div className="row library-row">
      <div className="col-2">
        <img className="library-img" src={song.img} alt={song.name} />
      </div>
      <div className="col-10 align-self-center">
        <h6>{song.name}</h6>
        <p>{song.singer}</p>
      </div>
    </div>
  );
};

export default SongCard;
