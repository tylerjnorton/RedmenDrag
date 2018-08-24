type unsubscribe = unit => unit;

[@bs.module "./firebase"]
external onAuthStateChange: (Types.user => unit) => unsubscribe = "";

[@bs.module "./firebase"] external login: unit => unit = "";

[@bs.module "./firebase"]
external onPlayerChangedInternal:
  (Types.user, (string, 'a) => unit) => unsubscribe =
  "onPlayerChanged";

let onPlayerChanged = (user, onChange) =>
  onPlayerChangedInternal(user, (eventType, payload) =>
    switch (eventType) {
    | "player_added" =>
      Types.PlayerAdded(payload |> Types.playerFromJs) |> onChange
    | "player_removed" =>
      Types.PlayerRemoved(payload |> Types.playerFromJs) |> onChange
    | "player_modified" =>
      Types.PlayerModified(payload |> Types.playerFromJs) |> onChange
    | unknownType => Js.log2("Unknown Type:", unknownType)
    }
  );

[@bs.module "./firebase"]
external addPlayer:
  (~user: Types.user, ~playerName: string, ~file: Types.file) =>
  Repromise.t(unit) =
  "";

[@bs.module "./firebase"]
external modifyPlayerInternal: (Types.user, Types.abs_player, bool) => unit =
  "modifyPlayer";

[@bs.module "./firebase"]
external removePlayerInternal: (Types.user, Types.abs_player) => unit =
  "removePlayer";

let modifyPlayer = (user: Types.user, player: Types.player, isSelected: bool) =>
  modifyPlayerInternal(user, Types.playerToJs(player), isSelected);

let removePlayer = (user: Types.user, player: Types.player) =>
  removePlayerInternal(user, Types.playerToJs(player));