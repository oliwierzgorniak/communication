const $otherCamera = document.getElementById("otherCamera");

let socket;
let peer;

const servers = {
  iceServers: [
    {
      urls: `stun:stun.l.google.com:19302`,
    },
  ],
};

const init = async () => {
  initSocket();
  $otherCamera.addEventListener("click", () => {
    $otherCamera.play();
  });
};

const initSocket = () => {
  socket = io.connect(`/`);
  socket.on(`connect`, () => {
    console.log(socket.id);
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

const answerPeerOffer = async (_, __, peerId) => {
  peer = new SimplePeer();
  peer.on("signal", (data) => {
    socket.emit("signal", peerId, data);
  });
  peer.on("stream", (stream) => {
    $otherCamera.srcObject = stream;
  });
};

init();
