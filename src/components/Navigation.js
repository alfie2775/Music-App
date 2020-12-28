import "../css/navigation.css";
const Navigation = ({ openLibrary }) => {
  return (
    <div className="navibar container">
      <div className="row">
        <div className="col-6">
          <h1 className="brand">MUSIC PLAYER</h1>
        </div>
        <div className="col-2 ml-auto">
          <button className="btn" onClick={openLibrary}>
            <span className="fa fa-music fa-lg"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
