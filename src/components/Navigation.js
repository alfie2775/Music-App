import "../css/navigation.css";
const Navigation = ({ openLibrary }) => {
  return (
    <div className="navibar container">
      <div className="row">
        <div className="col-6">
          <p className="brand mt-2">MUSIC PLAYER</p>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <div>
            <button
              style={{ color: "white" }}
              className="btn"
              onClick={openLibrary}
            >
              <span className="fa fa-music fa-lg"></span>
              <br />
              <span>Library</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
