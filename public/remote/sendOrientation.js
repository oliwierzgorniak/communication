const sendOrientation = (peer) => {
  document.addEventListener("click", () => {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          // do something with e
          window.addEventListener("deviceorientation", (e) => {
            if (peer) peer.send(e.beta);
          });
        }
      })
      .catch(console.error);
  });
};

export default sendOrientation;
