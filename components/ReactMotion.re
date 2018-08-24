type opaqueConfig('a);

[@bs.deriving abstract]
type springConfig = {
  [@bs.optional]
  stiffness: float,
  [@bs.optional]
  damping: float,
  [@bs.optional]
  precision: float,
};

[@bs.module "react-motion"]
external makeSpring: float => opaqueConfig('a) = "spring";

[@bs.module "react-motion"] external motion: ReasonReact.reactClass = "Motion";

module Motion = {
  [@bs.deriving abstract]
  type jsProps('a) = {style: 'a};

  let make = (~style, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=motion,
      ~props=jsProps(~style),
      children,
    );
};