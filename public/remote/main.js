import getPeerId from "./getPeerId.js";
import sendOrientation from "./sendOrientation.js";

// https://github.com/devinekask/creative-code-4-s25/blob/main/webrtc/projects/p04-simple-peer/public/sender.html
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
  const peerId = getPeerId();
  console.log(peerId);
  callPeer(peerId);
  sendOrientation(peer);
  // const constraints = { audio: true, video: { width: 1280, height: 720 } };
  // myStream = await navigator.mediaDevices.getUserMedia(constraints);
  // $myCamera.srcObject = myStream;
  // $myCamera.onloadedmetadata = () => $myCamera.play();
};

const initSocket = () => {
  socket = io.connect("/");
  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("signal", async (myId, signal, peerId) => {
    console.log(`Received signal from ${peerId}`);
    console.log(signal);
    peer.signal(signal);
  });
};

const callPeer = async (peerId) => {
  peer = new SimplePeer({ initiator: true });
  peer.on("signal", (data) => {
    socket.emit("signal", peerId, data);
  });
  peer.on("connect", () => {
    // wait for 'connect' event before using the data channel
    peer.send("hey peer2, how is it going?");
  });
};

init();
