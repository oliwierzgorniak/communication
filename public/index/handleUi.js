const handleUi = () => {
  const songButtons = document.querySelectorAll(".menu__song-button");
  songButtons.forEach(($button) => {
    $button.addEventListener("click", () => {
      const $connecting = document.querySelector(".connecting");
      $connecting.classList.remove("hidden");
      const $menu = document.querySelector(".menu");
      $menu.classList.add("hidden");
    });
  });
};

export default handleUi;
