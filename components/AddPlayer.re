type readyForAddType = {playerName: string, fileInputRef: ref(option(Dom.element)),};

type uploadingType = {progress: int};

type state =
  | ReadyForAdd(readyForAddType)
  | Uploading(uploadingType);

let setFileInputRef = (theRef, {ReasonReact.state}) =>
  {
	  switch(state) {
	  | ReadyForAdd(obj) => obj.fileInputRef := theRef
	  | Uploading(_) => ()
	  }
  };

let handleSubmit = (state, event) => {
  event |> ReactEventRe.Form.preventDefault;
  switch (state) {
  | ReadyForAdd(_) => Js.log("Ready to Add New")
  | Uploading(_) => Js.log("Current Uploading")
  };
};

type action =
  | SetNewPlayerName(string);

let component = ReasonReact.reducerComponent("AddPlayer");

let make = _children => {
  ...component,
  initialState: () => {
    fileInputRef: ref(None),
    status: ReadyForAdd({playerName: ""}),
  },
  reducer: (action, state) =>
    switch (action) {
    | SetNewPlayerName(newName) =>
      ReasonReact.Update({
        ...state,
        status: ReadyForAdd({playerName: newName}),
      })
    },
  shouldUpdate: ({oldSelf, newSelf}) => oldSelf.state !== newSelf.state,
  render: self =>
    <form onSubmit=(handleSubmit(self.state))>
      <h2> (ReasonReact.string("Add a player")) </h2>
      <p>
        (
          ReasonReact.string(
            "Give a name then pick the file. "
            ++ "Players are displayed alphabetically below. "
            ++ "Check them off to add them to the pitch.",
          )
        )
      </p>
      <input
        id="playerNameInput"
        _type="text"
        required=true
        placeholder="Player Name"
        value="hi"
        onChange=(
          event =>
            self.send(
              SetNewPlayerName(
                (
                  event
                  |> ReactEventRe.Form.target
                  |> ReactDOMRe.domElementToObj
                )##value,
              ),
            )
        )
      />
      <input
        _type="file"
        required=true
        accept="image/png, image/jpeg, image/jpg"
        ref=(self.handle(setFileInputRef))
      />
      <br />
      <br />
      <button id="addPlayerBtn" disabled=false>
        (ReasonReact.string("Add Player"))
      </button>
    </form>,
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));