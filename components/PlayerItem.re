let component = ReasonReact.statelessComponent("PlayerItem");

let make =
    (
      ~player: Types.player,
      ~deletePlayer: unit => unit,
      ~setSelected: bool => unit,
      _children,
    ) => {
  ...component,
  render: _self =>
    <li>
      <input
        type_="checkbox"
        checked={player.isSelected}
        onChange={_ => setSelected(!player.isSelected)}
      />
      <img src={player.url} />
      <span> {ReasonReact.string(player.playerName)} </span>
      <button onClick={_ => deletePlayer()}>
        {ReasonReact.string("Delete")}
      </button>
    </li>,
};