import { peer } from "./main.js";

const handleVoice = () => {
  peer.on("stream", (stream) => {
    console.log(stream);
  });
};

export default handleVoice;
