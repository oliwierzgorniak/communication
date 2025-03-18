//  https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/3.microphone-input-and-recording.html
const sendVoice = (peer) => {
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        peer.addStream(stream);
        // `microphone` can now act like any other AudioNode
      })
      .catch((err) => {
        // browser unable to access microphone
        // (check to see if microphone is attached)
      });
  } else {
    // browser unable to access media devices
    // (update your browser)
  }
};

export default sendVoice;
