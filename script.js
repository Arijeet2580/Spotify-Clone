//Initialization of Variables
let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let SeekBar = document.getElementById("ProgressBar");
let gif = document.getElementById("gif");
let songInfoName = document.getElementById("songInfoName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
//Song Array
let songs = [
  { songName: "Song1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Song2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Song3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Song4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Song5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Song6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Song7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Song8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Song9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
];
//Play-pause Update
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
//Seekbar Update
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  SeekBar.value = progress;
});
SeekBar.addEventListener("change", () => {
  audioElement.currentTime = (SeekBar.value * audioElement.duration) / 100;
});
//SongItem Update
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("SongName")[0].innerText = songs[i].songName;
});
let SongItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let resetPlay = () => {
  SongItemPlay.forEach((element) => {
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
  });
};
SongItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    resetPlay();
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    songIndex = e.target.id;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    audioElement.play();
    songInfoName.innerText = songs[songIndex - 1].songName;
    gif.style.opacity = 1;
    console.log(audioElement.src);
  });
});
document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    if (songIndex == 1) {
      songIndex = 9;
    } else {
      songIndex--;
    }
  }
  console.log(songIndex);
  audioElement.src = `songs/${songIndex}.mp3`;
  songInfoName.innerText = songs[songIndex - 1].songName;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  audioElement.play();
  console.log(audioElement.src);
});
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 1;
  } else {
    songIndex++;
  }
  console.log(songIndex);
  audioElement.src = `songs/${songIndex}.mp3`;
  songInfoName.innerText = songs[songIndex - 1].songName;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  audioElement.play();
});
