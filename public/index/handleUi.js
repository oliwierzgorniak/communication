const handleUi = () => {
  const songButtons = document.querySelectorAll(".menu__song-button");
  songButtons.forEach(($button) => {
    $button.addEventListener("click", () => {
      const $game = document.querySelector(".game");
      $game.classList.remove("hidden");
      const $menu = document.querySelector(".menu");
      $menu.classList.add("hidden");
    });
  });
};

export default handleUi;
