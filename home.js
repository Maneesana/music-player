////////////////////////////////////////////////////
"use strict";

const songCollection = [
  { artist: "Annie Marie", songname: "Alarm", path: "./Music/alarm.mp3" },
  {
    artist: "Alan Walker",
    songname: "Sing Me To Sleep",
    path: "./Music/sing_me_to_sleep.mp3",
  },
  {
    artist: "Alan Walker",
    songname: "On My Way",
    path: "./Music/on_my_way.mp3",
  },
  {
    artist: "Post Malone",
    songname: "You Said ft.6BLACK",
    path: "./Music/you_said.mp3",
  },
  {
    artist: "Tyga King Los",
    songname: "Get Home Freestyle",
    path: "./Music/get_home.mp3",
  },
  {
    artist: "BTS",
    songname: "Savage Love",
    path: "./Music/savage_love.mp3",
  },
  {
    artist: "Rita Ora",
    songname: "Proud",
    path: "./Music/proud.mp3",
  },
  {
    artist: "Alan Walker",
    songname: "Spectre",
    path: "./Music/spectre.mp3",
  },
  {
    artist: "Young Dolph",
    songname: "Key Glock Aspen",
    path: "./Music/aspen.mp3",
  },
  {
    artist: "Jeon Somi",
    songname: "ANYMORE",
    path: "./Music/anymore.mp3",
  },
];

const audioEle = document.querySelector(".music-data");

const play_button = document.querySelector(".play-button");
const video = document.querySelector(".video");
const audio = document.querySelector("audio");
const slider = document.querySelector(".slider");
const volumeSlider = document.querySelector(".slider-vol");

const prevButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");

const artistName = document.querySelector(".artist-name");

const songName = document.querySelector(".song-name");
let playClickCounter = 0;

let currSong = {
  index: 0,
  songname: "",
  artist: "",
  duration: "",
};
let sliderCurrentPos;
let relativeAudioPos;
let relativeSliderPos;

//initial state-- displaying song details
artistName.textContent = songCollection[0].artist;
songName.textContent = songCollection[0].songname;

// volume controls
volumeSlider.addEventListener("input", () => {
  let relativeVol = volumeSlider.value * 0.1;
  audioEle.volume = relativeVol;
});

// updating song information
function updateDisplay(index) {
  artistName.textContent = songCollection[index].artist;
  songName.textContent = songCollection[index].songname;
}
//previous button
prevButton.addEventListener("click", () => {
  if (currSong.index == 0) {
    audioEle.src = songCollection[songCollection.length - 1].path;
    currSong.index = songCollection.length - 1;
    audioEle.play();
    updateDisplay(currSong.index);
  } else {
    audioEle.src = songCollection[currSong.index - 1].path;
    audioEle.play();
    currSong.index -= 1;
    updateDisplay(currSong.index);
  }
  // changing button orientation
  play_button.className = "pause-button";
  play_button.childNodes[1].className = "pause-vertical-1";
  play_button.childNodes[3].className = "pause-vertical-2";
});

// next button
nextButton.addEventListener("click", () => {
  if (currSong.index == songCollection.length - 1) {
    audioEle.src = songCollection[0].path;
    audioEle.play();
    currSong.index = 0;
    updateDisplay(currSong.index);
  } else {
    audioEle.src = songCollection[currSong.index + 1].path;
    audioEle.play();
    currSong.index += 1;
    updateDisplay(currSong.index);
  }

  // changing button orientation
  play_button.className = "pause-button";
  play_button.childNodes[1].className = "pause-vertical-1";
  play_button.childNodes[3].className = "pause-vertical-2";
});

// seeking functionality
slider.addEventListener("input", () => {
  relativeAudioPos = (slider.value * currSong.duration) / 100;
  audioEle.currentTime = relativeAudioPos;
});

// play and pause button
play_button.addEventListener("click", () => {
  currSong.duration = audioEle.duration;
  console.log(currSong);
  console.log(audioEle.currentTime);
  playClickCounter++;
  relativeSliderPos = audioEle.currentTime * (100 / currSong.duration);
  slider.value = relativeSliderPos;
  if (playClickCounter % 2 != 0) {
    audioEle.play();
    play_button.className = "pause-button";
    play_button.childNodes[1].className = "pause-vertical-1";
    play_button.childNodes[3].className = "pause-vertical-2";
  } else {
    audioEle.pause();
    play_button.className = "play-button";
    play_button.childNodes[1].className = "triangle-shape";
    play_button.childNodes[3].className = "";
  }
});

// playing slider movements
setInterval(() => {
  if (audioEle.currentTime == currSong.duration) {
    slider.value = 0;
    play_button.className = "play-button";
    play_button.childNodes[1].className = "triangle-shape";
    play_button.childNodes[3].className = "";
    clearInterval();
  }
  relativeSliderPos = audioEle.currentTime * (100 / currSong.duration);
  slider.value = !isNaN(relativeSliderPos) ? relativeSliderPos : 0;
}, 1000);

/////////////////---END----//////////////////////////
