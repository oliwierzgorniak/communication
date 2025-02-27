const $myCamera = document.getElementById("myCamera");
const $peerSelect = document.getElementById("peerSelect");

let socket;
let myStream;
let peer;

const servers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const init = async () => {
  initSocket();
  $peerSelect.addEventListener("input", callSelectedPeer);
  handleVideo();
};

const initSocket = () => {
  socket = io.connect("/");
  socket.on("connect", () => {
    console.log(socket.id);
  });
  socket.on("clients", updatePeerList);

  socket.on("signal", async (_, signal, peerId) => {
    console.log(`Received signal from ${peerId}`);
    console.log(signal);
    peer.signal(signal);
  });
};

const updatePeerList = (clients) => {
  $peerSelect.innerHTML =
    '<option value="none">--- Select Peer To Call ---</option>';
  for (const clientId in clients) {
    const isMyOwnId = clientId === socket.id;
    if (clients.hasOwnProperty(clientId) && !isMyOwnId) {
      // const client = clients[clientId];
      const $option = document.createElement("option");
      $option.value = clientId;
      $option.textContent = clientId;
      $peerSelect.appendChild($option);
    }
  }
};

const callSelectedPeer = async () => {
  if ($peerSelect.value === "none") {
    // TODO: disconnect
    return;
  }
  console.log("call selected peer", $peerSelect.value);

  callPeer($peerSelect.value);
};

const callPeer = async (peerId) => {
  peer = new SimplePeer({ initiator: true, stream: myStream });
  peer.on("signal", (data) => {
    socket.emit("signal", peerId, data);
  });
};

const handleVideo = async () => {
  const constraints = { audio: true, video: { width: 1280, height: 720 } };
  myStream = await navigator.mediaDevices.getUserMedia(constraints);
  $myCamera.srcObject = myStream;
  $myCamera.onloadedmetadata = () => $myCamera.play();
};

init();
