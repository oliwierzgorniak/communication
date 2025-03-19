import { score } from "./updateScore.js";

const handleEnd = () => {
  setTimeout(() => {
    const $game = document.querySelector(".game");
    $game.classList.add("hidden");
    const $result = document.querySelector(".result");
    $result.classList.remove("hidden");

    const $score = $result.querySelector(".result__score");
    $score.textContent = score;
  }, 25000);
};

export default handleEnd;
