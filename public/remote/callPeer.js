import { socket } from "./initSocket.js";
import getPeerId from "./getPeerId.js";
export let peer;

const callPeer = async () => {
  const peerId = getPeerId();
  peer = new SimplePeer({ initiator: true });
  peer.on("signal", (data) => {
    socket.emit("signal", peerId, data);
  });
};

export default callPeer;
