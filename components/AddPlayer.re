type form = {
  playerName: string,
  file: option(Types.file),
};

type state =
  | Uploading
  | WaitingForAdd(form);

type action =
  | SetNewPlayerName(string)
  | SetFile(option(Types.file))
  | Upload(string, Types.file)
  | UploadEnded;

let component = ReasonReact.reducerComponent("AddPlayer");

let handleSubmit = (event, {ReasonReact.state, ReasonReact.send}) => {
  event->ReactEvent.Form.preventDefault;
  switch (state) {
  | Uploading => Js.log("Cant submit again")
  | WaitingForAdd({playerName, file}) =>
    switch (file) {
    | Some(file) => send(Upload(playerName, file))
    | None => Js.log("No File..")
    }
  };
};

let make = (~user: Types.user, _children) => {
  ...component,
  initialState: () => WaitingForAdd({file: None, playerName: ""}),
  reducer: (action: action, state: state) =>
    switch (state) {
    | WaitingForAdd(form) =>
      switch (action) {
      | SetNewPlayerName(playerName) =>
        ReasonReact.Update(WaitingForAdd({...form, playerName}))
      | SetFile(file) => ReasonReact.Update(WaitingForAdd({...form, file}))
      | Upload(playerName, file) =>
        ReasonReact.UpdateWithSideEffects(
          Uploading,
          (
            self =>
              Firebase.addPlayer(~user, ~playerName, ~file)
              ->Promise.get(() => self.send(UploadEnded))
          ),
        )
      | UploadEnded => ReasonReact.NoUpdate
      }
    | Uploading =>
      switch (action) {
      | SetNewPlayerName(_)
      | SetFile(_)
      | Upload(_, _) => ReasonReact.NoUpdate
      | UploadEnded =>
        ReasonReact.Update(WaitingForAdd({playerName: "", file: None}))
      }
    },
  render: self =>
    <form onSubmit={self.handle(handleSubmit)}>
      <h2> {ReasonReact.string("Add a player")} </h2>
      <p>
        {
          ReasonReact.string(
            "Give a name then pick the file. "
            ++ "Players are displayed alphabetically below. "
            ++ "Check them off to add them to the pitch.",
          )
        }
      </p>
      <div>
        {
          switch (self.state) {
          | Uploading => <div> {ReasonReact.string("Uploading")} </div>
          | WaitingForAdd({playerName}) =>
            <div>
              <input
                id="playerNameInput"
                type_="text"
                required=true
                placeholder="Player Name"
                value=playerName
                onChange=(
                  event =>
                    SetNewPlayerName(event->ReactEvent.Form.target##value)
                    |> self.send
                )
              />
              <input
                type_="file"
                required=true
                accept="image/png, image/jpeg, image/jpg"
                onChange=(
                  event => {
                    let files: array(Types.file) =
                      event->ReactEvent.Form.target##files;
                    self.send(SetFile(Belt.Array.get(files, 0)));
                  }
                )
              />
            </div>
          }
        }
      </div>
      <br />
      <br />
      <button id="addPlayerBtn" disabled=false>
        {ReasonReact.string("Add Player")}
      </button>
    </form>,
};