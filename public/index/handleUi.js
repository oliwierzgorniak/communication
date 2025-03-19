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

  const $resultButton = document.querySelector(".result__button");
  $resultButton.addEventListener("click", () => {
    const $result = document.querySelector(".result");
    $result.classList.add("hidden");
    const $menu = document.querySelector(".menu");
    $menu.classList.remove("hidden");
  });
};

export default handleUi;
