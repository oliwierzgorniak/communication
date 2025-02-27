const $video = document.getElementById("video");

const init = async () => {
  const constraints = {
    audio: false,
    video: true,
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  $video.srcObject = stream;
};

init();
