import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./handleCanvas.js";
export const NOTE_WIDTH = 10;
export const NOTE_HEIGHT = 10;

export let notes = [];

const moveNotes = () => {
  notes = notes.map(({ x, y }) => ({ x: x, y: y + CANVAS_HEIGHT * 0.01 }));
  requestAnimationFrame(moveNotes);
};

const handleNotes = (interval = 500) => {
  setInterval(() => {
    const x = Math.floor(Math.random() * CANVAS_WIDTH);
    notes.push({ x: x, y: 0 });
  }, interval);

  requestAnimationFrame(moveNotes);
};

export default handleNotes;
