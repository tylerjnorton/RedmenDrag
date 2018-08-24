[%%debugger.chrome];

let component = ReasonReact.statelessComponent("Upload");

let make = (~user: Types.user, _children) => {
  ...component,
  render: _self =>
    <div className="upload">
      <AddPlayer user />
      <h4> {ReasonReact.string("Current Player List (Alphabetical)")} </h4>
      <Players user>
        ...{
             ({players, setSelected, deletePlayer}) =>
               <ul>
                 {
                   ReasonReact.array(
                     Array.map(
                       (player: Types.player) =>
                         <PlayerItem
                           key={player.id}
                           player
                           setSelected={setSelected(player)}
                           deletePlayer={() => deletePlayer(player)}
                         />,
                       players,
                     ),
                   )
                 }
               </ul>
           }
      </Players>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {user: Types.user};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~user=jsProps->userGet, [||])
  );