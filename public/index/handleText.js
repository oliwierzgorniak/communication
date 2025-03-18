const SONG = [
  {
    text: "Witaj majowa jutrzenko, Świeć naszej polskiej krainie,",
    time: 0,
  },
  {
    text: "Uczcimy ciebie piosenką Przy hulance i przy winie:",
    time: 5500,
  },
  {
    text: "Witaj maj, trzeci maj, U Polaków błogi raj!",
    time: 11700,
  },
  {
    text: "Witaj maj, trzeci maj, U Polaków błogi raj!",
    time: 17900,
  },
];

const handleText = () => {
  const $firstLine = document.querySelector(".game__text");
  SONG.forEach((line) => {
    setTimeout(() => {
      $firstLine.textContent = line.text;
    }, line.time);
  });
};

export default handleText;
