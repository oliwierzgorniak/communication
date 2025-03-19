// https://github.com/devinekask/creative-code-4-s25/blob/main/webrtc/projects/p04-simple-peer/public/sender.html
import callPeer, { peer } from "./callPeer.js";
import initSocket from "./initSocket.js";

const init = async () => {
  const $button = document.querySelector(".button");
  $button.addEventListener("click", () => {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          Array.from(document.body.children).forEach(($child) =>
            $child.classList.add("hidden")
          );

          initSocket();
          callPeer();

          window.addEventListener("deviceorientation", (e) => {
            if (peer) peer.send(e.beta);
          });
        }
      })
      .catch(console.error);
  });
};

init();
