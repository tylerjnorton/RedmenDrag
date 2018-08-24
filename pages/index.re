[%%debugger.chrome];

let requestFullScreen = [%raw
  () => "
    const canvas = document.querySelector('canvas');

    if (canvas.requestFullscreen) {
      return  canvas.requestFullscreen();
    }

    if (canvas.webkitRequestFullscreen) {
      return canvas.webkitRequestFullscreen();
    }
"
];

let component = ReasonReact.statelessComponent("Upload");

let make = (~user: Types.user, _children) => {
  ...component,
  render: _self =>
    <div>
      <div className="uipanel">
        <button
          className="fullscreen"
          id="requestFullScreenBtn"
          onClick=requestFullScreen>
          {ReasonReact.string("FULLSCREEN")}
        </button>
        <div className="title"> {ReasonReact.string("STARTING XI")} </div>
        <div className="dropdown">
          <button className="dropbtn">
            {ReasonReact.string("SELECT A VIEW")}
          </button>
          <div id="myDropdown" className="dropdown-content">
            <a href="#"> {ReasonReact.string("VIDEO ANALYSIS")} </a>
            <a href="#"> {ReasonReact.string("TACTICS BOARD")} </a>
          </div>
        </div>
      </div>
      <Players user> ...{({players}) => <Board players />} </Players>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {user: Types.user};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~user=jsProps->userGet, [||])
  );