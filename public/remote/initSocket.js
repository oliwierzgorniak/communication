import { peer } from "./callPeer.js";
export let socket;

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

export default initSocket;
