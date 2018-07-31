export default class Button {
  constructor(props) {
    this.position = props;
  }
  render(context) {
    const { color, x, y, width, height, text } = this.position;
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.fillStyle = "white";
    context.fillText(text, x + 20, y + 40);
  }
}
