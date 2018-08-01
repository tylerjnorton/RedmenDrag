export default () => (
  <div>
    <div className="uipanel">
      <button className="fullscreen" id="requestFullScreenBtn">
        FULLSCREEN
      </button>
      <button className="fullscreen" id="clearAllBtn">
        CLEAR
      </button>
      <div className="title">STARTING XI</div>

      <div className="dropdown">
        <button className="dropbtn">SELECT A VIEW</button>
        <div id="myDropdown" className="dropdown-content">
          <a href="#">VIDEO ANALYSIS</a>
          <a href="#">TACTICS BOARD</a>
        </div>
      </div>
    </div>
    <canvas id="dndcanvas">Sorry, canvas not supported... (try chrome)</canvas>
    <script src="/static/main.js" type="module" />
  </div>
);
