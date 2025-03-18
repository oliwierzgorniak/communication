import { peer } from "./main.js";
import handleNotes, { notes, NOTE_HEIGHT, NOTE_WIDTH } from "./handleNotes.js";
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 300;
const CATCHER_WIDTH = 100;
const CATCHER_HEIGHT = 20;

const catcher = {
  x: CANVAS_WIDTH / 2 - CATCHER_WIDTH / 2,
  y: CANVAS_HEIGHT - CATCHER_HEIGHT,
};

const drawOnCanvas = (ctx) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillRect(catcher.x, catcher.y, CATCHER_WIDTH, CATCHER_HEIGHT);
  notes.forEach(({ x, y }) => {
    ctx.fillRect(x, y, NOTE_WIDTH, NOTE_HEIGHT);
  });
  requestAnimationFrame(() => drawOnCanvas(ctx));
};

const handleCanvas = () => {
  const $canvas = document.querySelector(".canvas");
  const ctx = $canvas.getContext("2d");
  ctx.fillRect(100, 100, 100, 100);

  peer.on("data", (data) => {
    let cutData = Number(data);
    if (cutData < -45) cutData = -45;
    if (cutData > 45) cutData = 45;
    const multiplier = (cutData + 45) / 90;

    // console.log(multiplier);
    catcher.x = multiplier * (CANVAS_WIDTH - 100);
  });

  handleNotes();

  requestAnimationFrame(() => drawOnCanvas(ctx));
};

export default handleCanvas;
