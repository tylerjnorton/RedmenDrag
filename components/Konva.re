[@bs.module "react-konva"]
external konvaStage: ReasonReact.reactClass = "Stage";
[@bs.module "react-konva"]
external konvaLayer: ReasonReact.reactClass = "Layer";
[@bs.module "react-konva"]
external konvaImage: ReasonReact.reactClass = "Image";
[@bs.module "react-konva"]
external konvaGroup: ReasonReact.reactClass = "Group";
[@bs.module "react-konva"] external konvaRect: ReasonReact.reactClass = "Rect";
[@bs.module "react-konva"] external konvaText: ReasonReact.reactClass = "Text";

module Stage = {
  [@bs.deriving abstract]
  type jsProps = {
    width: float,
    height: float,
  };

  /* <Stage width={window.innerWidth} height={window.innerHeight - 40}> */
  let make = (~width, ~height, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=konvaStage,
      ~props=jsProps(~width, ~height),
      children,
    );
};

module Layer = {
  let make = children =>
    ReasonReact.wrapJsForReason(~reactClass=konvaLayer, ~props=(), children);
};

module KImage = {
  [@bs.deriving abstract]
  type jsProps = {
    x: float,
    y: float,
    width: float,
    height: float,
    image: Webapi.Dom.HtmlImageElement.t,
    draggable: Js.nullable(bool),
    onDragEnd: Js.nullable(ReactEvent.Synthetic.t => unit),
    stroke: Js.nullable(string),
    strokeWidth: Js.nullable(int),
    onDblClick: Js.nullable(unit => unit),
    onDblTap: Js.nullable(unit => unit),
  };

  let make =
      (
        ~x,
        ~y,
        ~width,
        ~height,
        ~image,
        ~draggable=?,
        ~onDragEnd=?,
        ~stroke=?,
        ~strokeWidth=?,
        ~onDblClick=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=konvaImage,
      ~props=
        jsProps(
          ~x,
          ~y,
          ~width,
          ~height,
          ~image,
          ~draggable=Js.Nullable.fromOption(draggable),
          ~onDragEnd=Js.Nullable.fromOption(onDragEnd),
          ~stroke=Js.Nullable.fromOption(stroke),
          ~strokeWidth=Js.Nullable.fromOption(strokeWidth),
          ~onDblClick=Js.Nullable.fromOption(onDblClick),
          ~onDblTap=Js.Nullable.fromOption(onDblClick),
        ),
      children,
    );
};

module SmartImage = {
  /* Its not that smart, it just doesn't create a new Image element on every render */
  type imageStatus =
    | Loading
    | Loaded;
  type state = {
    image: Webapi.Dom.HtmlImageElement.t,
    imageStatus,
  };
  type action =
    | ImageLoaded;

  let component = ReasonReact.reducerComponent("SmartImage");

  let make =
      (
        ~x,
        ~y,
        ~width,
        ~height,
        ~imageSrc,
        ~draggable=?,
        ~onDragEnd=?,
        ~stroke=?,
        ~strokeWidth=?,
        ~onDblClick=?,
        _children,
      ) => {
    ...component,
    initialState: () => {
      let image = Webapi.Dom.HtmlImageElement.make();
      Webapi.Dom.HtmlImageElement.setSrc(image, imageSrc);
      {image, imageStatus: Loading};
    },
    didMount: self =>
      Webapi.Dom.HtmlImageElement.addEventListener(
        "load",
        _event => self.send(ImageLoaded),
        self.state.image,
      ),
    reducer: (action, state) =>
      switch (action) {
      | ImageLoaded => ReasonReact.Update({...state, imageStatus: Loaded})
      },
    render: self =>
      <KImage
        x
        y
        width
        height
        image={self.state.image}
        ?draggable
        ?onDragEnd
        ?stroke
        ?strokeWidth
        ?onDblClick
      />,
  };
};

module Group = {
  [@bs.deriving abstract]
  type jsProps = {
    onClick: ReactEvent.Synthetic.t => unit,
    onTap: ReactEvent.Synthetic.t => unit,
  };

  let make = (~onClick, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=konvaGroup,
      ~props=jsProps(~onClick, ~onTap=onClick),
      children,
    );
};

module Rect = {
  [@bs.deriving abstract]
  type jsProps = {
    x: float,
    y: float,
    width: float,
    height: float,
    fill: string,
  };

  let make = (~x, ~y, ~width, ~height, ~fill, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=konvaRect,
      ~props=jsProps(~x, ~y, ~width, ~height, ~fill),
      children,
    );
};

module Text = {
  [@bs.deriving abstract]
  type jsProps = {
    fontSize: int,
    fontFamily: string,
    fill: string,
    x: float,
    y: float,
    text: string,
  };

  let make = (~fontSize, ~fontFamily, ~fill, ~x, ~y, ~text, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=konvaText,
      ~props=jsProps(~fontSize, ~fontFamily, ~fill, ~x, ~y, ~text),
      children,
    );
};