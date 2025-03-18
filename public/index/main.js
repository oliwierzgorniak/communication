import generateQr from "./generateQr.js";
import handleCanvas from "./handleCanvas.js";

// https://github.com/devinekask/creative-code-4-s25/blob/main/webrtc/projects/p04-simple-peer/public/receiver.html
let socket;
export let peer;

const servers = {
  iceServers: [
    {
      urls: `stun:stun.l.google.com:19302`,
    },
  ],
};

const init = async () => {
  initSocket();
  // $otherCamera.addEventListener("click", () => {
  //   $otherCamera.play();
  // });
};

const initSocket = () => {
  socket = io.connect(`/`);
  socket.on(`connect`, () => {
    console.log(socket.id);
    generateQr(socket.id);
  });
  socket.on("signal", async (myId, signal, peerId) => {
    console.log(`Received signal from ${peerId}`);
    console.log(signal);
    if (signal.type === "offer") {
      answerPeerOffer(myId, signal, peerId);
    }
    peer.signal(signal);
  });
};

const answerPeerOffer = async (myId, offer, peerId) => {
  peer = new SimplePeer();
  peer.on("signal", (data) => {
    socket.emit("signal", peerId, data);
  });

  handleCanvas();
};

init();
