import Players from "../components/Players";
import AddPlayer from "../components/AddPlayer";

export default () => (
  <div className="upload">
    <Players>
      {(players, { removePlayer, togglePlayerSelected }) => {
        return (
          <>
            <AddPlayer />
            <h4>Current Player List (Alphabetical)</h4>
            <ul id="redmenList">
              {players.map(player => (
                <li key={player.id}>
                  <img src={player.url} />
                  <span>{player.playerName}</span>
                  <button onClick={removePlayer(player)}>Delete</button>
                  <input
                    onChange={togglePlayerSelected(player)}
                    type="checkbox"
                    checked={!!player.isSelected}
                  />
                </li>
              ))}
            </ul>
          </>
        );
      }}
    </Players>
  </div>
);
