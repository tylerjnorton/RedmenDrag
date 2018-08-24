type state = {players: Belt.Map.String.t(Types.player)};

type action =
  | PlayerAdded(Types.player)
  | PlayerModified(Types.player)
  | PlayerRemoved(Types.player)
  | DeletePlayer(Types.player)
  | SetSelected(Types.player, bool);

type renderProp = {
  players: array(Types.player),
  setSelected: (Types.player, bool) => unit,
  deletePlayer: Types.player => unit,
};

let component = ReasonReact.reducerComponent("Players");

let handlePlayerChanged = (event, {ReasonReact.send}) =>
  switch (event) {
  | Types.PlayerAdded(player) => send(PlayerAdded(player))
  | Types.PlayerModified(player) => send(PlayerModified(player))
  | Types.PlayerRemoved(player) => send(PlayerRemoved(player))
  };

let make =
    (~user: Types.user, children: renderProp => ReasonReact.reactElement) => {
  ...component,
  initialState: () => {players: Belt.Map.String.empty},
  reducer: (action, state: state) =>
    switch (action) {
    | PlayerModified(player)
    | PlayerAdded(player) =>
      ReasonReact.Update({
        players: Belt.Map.String.set(state.players, player.id, player),
      })
    | PlayerRemoved(player) =>
      ReasonReact.Update({
        players: Belt.Map.String.remove(state.players, player.id),
      })
    | SetSelected(player, isSelected) =>
      ReasonReact.SideEffects(
        (_self => Firebase.modifyPlayer(user, player, isSelected)),
      )
    | DeletePlayer(player) =>
      ReasonReact.SideEffects((_self => Firebase.removePlayer(user, player)))
    },
  didMount: self =>
    self.onUnmount(
      Firebase.onPlayerChanged(user, self.handle(handlePlayerChanged)),
    ),
  render:
    (self: ReasonReact.self(state, ReasonReact.noRetainedProps, action)) =>
    children({
      players: Belt.Map.String.valuesToArray(self.state.players),
      setSelected: (player, isSelected) =>
        self.send(SetSelected(player, isSelected)),
      deletePlayer: player => self.send(DeletePlayer(player)),
    }),
};