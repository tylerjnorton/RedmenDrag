type file;
type user;

type loggedInState = {currentUser: user};

type globalState =
  | Loading
  | LoggedIn(loggedInState)
  | LoggedOut;

[@bs.deriving {jsConverter: newType}]
type player = {
  playerName: string,
  isSelected: bool,
  id: string,
  url: string,
};

type playerChangedEvent =
  | PlayerAdded(player)
  | PlayerModified(player)
  | PlayerRemoved(player);