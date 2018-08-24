[@bs.val] external windowWidth: float = "window.innerWidth";
[@bs.val] external windowHeight: float = "window.innerHeight";

let imageSize = () => windowWidth /. 15.;
let imageGutter = () => windowWidth /. 140.;
let perRow = 5;

let computeInitialPosition = index => {
  let xCo = index mod perRow;
  let size = imageSize();
  let gutter = imageGutter();

  let x =
    windowWidth /. 50. +. (size +. gutter) *. Pervasives.float(xCo) +. gutter;

  let y = (size +. gutter) *. Pervasives.float(index / perRow) +. gutter;

  (x, y);
};

module Background = {
  let component = ReasonReact.statelessComponent("Background");
  let make = _children => {
    ...component,
    render: _self =>
      <Konva.SmartImage
        imageSrc="/static/images/background.png"
        x=0.
        y=0.
        width=windowWidth
        height={windowHeight -. 40.}
      />,
  };
};

module ResetButton = {
  let component = ReasonReact.statelessComponent("ResetButton");
  let make = (~onClick, _children) => {
    ...component,
    render: _self =>
      <Konva.Group onClick>
        <Konva.Rect
          x={windowWidth /. 3. /. 2.}
          y={windowHeight -. 150.}
          width=120.
          height=60.
          fill="#5cbf2a"
        />
        <Konva.Text
          fontSize=30
          fontFamily="Arial"
          fill="white"
          x={windowWidth /. 3. /. 2. +. 20.}
          y={windowHeight -. 134.}
          text="Reset"
        />
      </Konva.Group>,
  };
};

module PlayerIcon = {
  let component = ReasonReact.statelessComponent("PlayerIcon");

  /* <ReactMotion.Motion
     style={
       "x": ReactMotion.makeSpring(x),
       "y": ReactMotion.makeSpring(y),
     }>
     ...{
          interpolatingStyle =>   </ReactMotion.Motion>; */

  let make = (~url, ~onDouble, ~isHighlighted, ~onMove, ~position, _children) => {
    ...component,
    render: _self => {
      Js.log(url);
      let (x, y) = position;

      <Konva.SmartImage
        x
        y
        draggable=true
        width={imageSize()}
        height={imageSize()}
        imageSrc=url
        stroke="#f9a602"
        onDragEnd=onMove
        strokeWidth={isHighlighted ? 20 : 0}
        onDblClick=onDouble
      />;
    },
  };
};

type state = {
  highlightedPlayer: option(Types.player),
  positions: Belt.Map.String.t((float, float)),
};

type action =
  | PlayerMoved(Types.player, float, float)
  | PlayerHighlighted(Types.player)
  | Reset;

let component = ReasonReact.reducerComponent("Board");

let make = (~players: array(Types.player), _children) => {
  ...component,
  initialState: () => {
    highlightedPlayer: None,
    positions: Belt.Map.String.empty,
  },
  reducer: (action, state) =>
    switch (action) {
    | Reset =>
      ReasonReact.Update({
        highlightedPlayer: None,
        positions: Belt.Map.String.empty,
      })
    | PlayerMoved(player, x, y) =>
      ReasonReact.Update({
        ...state,
        positions:
          x < windowWidth /. 3. ?
            Belt.Map.String.remove(state.positions, player.id) :
            Belt.Map.String.set(state.positions, player.id, (x, y)),
      })
    | PlayerHighlighted(player) =>
      ReasonReact.Update({...state, highlightedPlayer: Some(player)})
    },
  render: self =>
    <Konva.Stage width=windowWidth height={windowHeight -. 40.}>
      <Konva.Layer>
        <Background />
        {
          ReasonReact.array(
            players
            |> Array.to_list
            |> List.filter((player: Types.player) => player.isSelected)
            |> Array.of_list
            |> Array.mapi((index, player: Types.player) =>
                 <PlayerIcon
                   key={player.id}
                   url={player.url}
                   onDouble={() => self.send(PlayerHighlighted(player))}
                   onMove={
                     event => {
                       let (x, y) = (
                         ReactEvent.Synthetic.target(event)##attrs##x,
                         ReactEvent.Synthetic.target(event)##attrs##y,
                       );
                       self.send(PlayerMoved(player, x, y));
                     }
                   }
                   position={
                     switch (
                       Belt.Map.String.get(self.state.positions, player.id)
                     ) {
                     | None => computeInitialPosition(index)
                     | Some((x, y)) => (x, y)
                     }
                   }
                   isHighlighted={
                     switch (self.state.highlightedPlayer) {
                     | None => false
                     | Some(highlightedPlayer) => highlightedPlayer === player
                     }
                   }
                 />
               ),
          )
        }
        <ResetButton onClick={_event => self.send(Reset)} />
      </Konva.Layer>
    </Konva.Stage>,
};