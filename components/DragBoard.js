import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Group
} from "react-konva";

function computePlayerSize() {
  const IMAGE_SIZE = window.innerWidth / 15.5;
  const IMAGE_BUFFER = window.innerWidth / 140;
  const PER_ROW = 5;

  return { IMAGE_BUFFER, IMAGE_SIZE, PER_ROW };
}

function computePlayerPosition(index) {
  const { IMAGE_BUFFER, IMAGE_SIZE, PER_ROW } = computePlayerSize();

  const x =
    window.innerWidth / 50 +
    (IMAGE_SIZE + IMAGE_BUFFER) * (index % PER_ROW) +
    IMAGE_BUFFER;
  const y =
    (IMAGE_SIZE + IMAGE_BUFFER) * Math.floor(index / PER_ROW) + IMAGE_BUFFER;

  return { x, y };
}

function ResetButton({ resetPlayers }) {
  return (
    <Group onTap={resetPlayers} onClick={resetPlayers}>
      <Rect
        x={window.innerWidth / 3 / 2}
        y={window.innerHeight - 150}
        width={120}
        height={60}
        fill="#5cbf2a"
      />
      <Text
        fontSize="30"
        fontFamily="Arial"
        fill="white"
        x={window.innerWidth / 3 / 2 + 20}
        y={window.innerHeight - 134}
        text="Reset"
      />
    </Group>
  );
}

function Player({ url, index, onDouble, isHighlighted, onMove, position }) {
  const { IMAGE_SIZE } = computePlayerSize();
  const { x, y } = position || computePlayerPosition(index);

  const fillImage = new Image();
  fillImage.src = url;
  return (
    <KonvaImage
      draggable={true}
      onDragEnd={onMove}
      stroke="#f9a602"
      strokeWidth={isHighlighted ? 20 : 0}
      x={x}
      y={y}
      image={fillImage}
      width={IMAGE_SIZE - 5}
      height={IMAGE_SIZE - 5}
      onDblClick={onDouble}
      onDblTap={onDouble}
    />
  );
}

function Background() {
  const image = new Image();
  image.src = "/static/images/background.png";
  return (
    <KonvaImage
      image={image}
      x={0}
      y={0}
      width={window.innerWidth}
      height={window.innerHeight - 40}
    />
  );
}

export default class DragBoard extends React.Component {
  state = { highlightedPlayer: null, positions: {} };
  setHighlighted = player => event =>
    this.setState(state => ({ ...state, highlightedPlayer: player }));
  resetPlayers = event =>
    this.setState(state => ({
      ...state,
      highlightedPlayer: null,
      positions: {}
    }));
  onPlayerMoved = player => event => {
    const { x, y } = event.target.attrs;

    this.setState(state => ({
      ...state,
      positions: {
        ...state.positions,
        [player.id]: x < window.innerWidth / 3 ? null : { x, y }
      }
    }));
  };
  render() {
    console.log(this.state);
    const players = this.props.players;
    return (
      <Stage width={window.innerWidth} height={window.innerHeight - 40}>
        <Layer>
          <Background />
          <ResetButton resetPlayers={this.resetPlayers} />
          {players.filter(player => player.isSelected).map((player, index) => (
            <Player
              onMove={this.onPlayerMoved(player)}
              key={player.id}
              url={player.url}
              index={index}
              onDouble={this.setHighlighted(player)}
              position={this.state.positions[player.id]}
              isHighlighted={
                this.state.highlightedPlayer &&
                this.state.highlightedPlayer.id === player.id
              }
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}
