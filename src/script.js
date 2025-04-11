// navbar config
let menuO = document.getElementById("menu-o"),
  menuC = document.getElementById("menu-c"),
  navMenu = document.querySelector("nav"),
  header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 35) {
    header.classList.add("show")
  } else {
    header.classList.remove("show")
  }
});

menuO.addEventListener("click", () => {
  menuO.classList.add("hidden");
  menuC.classList.remove("hidden");
  navMenu.classList.remove("hidden");
});

menuC.addEventListener("click", () => {
  menuC.classList.add("hidden");
  menuO.classList.remove("hidden");
  navMenu.classList.add("hidden");
});

// Sheikhs’ div
const sheikhs = document.getElementById("sheikhs");

// fetching data from data.json file - Sheikhs’ data
async function fetchData() {
  const res = await fetch("/data.json");
  const data = await res.json();

  data.forEach(dta => {
    const div = document.createElement("div")

    div.innerHTML = `
      <div role="link" class="relative w-full aspect-[4/2.85] flex-col items-center justify-start gap-5 px-7 pt-[19%] rounded-2xl shadow-md shadow-green/5 0 overflow-hidden border border-green/15 bg-white">
        <h3 class="text-2xl text-shade text-center font-bold">${dta.name}</h3>
        <div class="div-banner absolute bottom-0 left-0 w-full flex items-center justify-between px-3.5 py-3 bg-white text-shade">
          <div class="w-fit items-center justify-start gap-0.5">
            <h4 class="text-6xl font-bold">${dta.duruus}</h4>
            <span class="w-fit flex flex-col items-center justify-center gap-0 text-shade font-bold">
              <i class="hgi hgi-stroke hgi-folder-audio text-3xl"></i>
              <span class="text-xs">Duruus</span>
            </span>
          </div>
          <div class="w-fit items-center justify-start gap-0.5">
            <h4 class="text-6xl font-bold">${dta.books}</h4>
            <span class="w-fit flex flex-col items-center justify-center gap-0 text-shade font-bold">
              <i class="hgi hgi-stroke hgi-book-04 text-3xl"></i>
              <span class="text-xs">Books</span>
            </span>
          </div>
          <div class="w-fit items-center justify-start gap-0.5">
            <h4 class="text-6xl font-bold">${dta.audios}</h4>
            <span class="w-fit flex flex-col items-center justify-center gap-0 text-shade font-bold">
              <i class="hgi hgi-stroke hgi-mic-01 text-3xl"></i>
              <span class="text-xs">Audios</span>
            </span>
          </div>
        </div>
      </div>
    `;

    sheikhs.appendChild(div);
  });
};

fetchData();

// audios’ div
const trending = document.getElementById("trending");

// fetching audios from trending.json file
async function fetchAudio() {
  const res = await fetch("/trending.json");
  const audios = await res.json();

  audios.forEach(audio => {
    const div = document.createElement("div")

    div.innerHTML = `
      <div role="button"
        class="goto-dars w-full items-center justify-between gap-7 px-5 py-3.5 rounded-xl shadow-md shadow-shade/5 bg-shade/5">
        <span
          class="play-audio hgi hgi-stroke hgi-play-circle w-16 flex items-center justify-center text-green text-5xl font-light"></span>
        <div class="w-full flex-col items-start justify-start gap-1.5">
          <h4 class="text-base text-green font-bold leading-tight line-clamp-2">${audio.darsu}</h4>
          <p class="text-xs text-shade/55 font-medium">${audio.name}</p>
        </div>
      </div>
    `;

    function showSection() {
      const activeSection = document.querySelector("#playing");

      activeSection.classList.remove("hidden");

      setTimeout(() => {
        activeSection.classList.remove("invisible");
      }, 500);

      // Scroll to the top of the new section
      activeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let gotoDars = document.querySelectorAll(".goto-dars");
    gotoDars.forEach(goto => {
      goto.addEventListener("click", () => {
        showSection();
        document.querySelector("header").classList.add("hidden");
        document.querySelector("main").classList.add("hidden");
        document.querySelector("footer").classList.add("hidden");
      });
    });

    trending.appendChild(div);
  });
};

fetchAudio();

// audios’ div
const topic = document.getElementById("series");

// fetching audios from series.json file
async function fetchSeries() {
  const res = await fetch("/series.json");
  const series = await res.json();

  series.forEach(serie => {
    const div = document.createElement("div")

    div.innerHTML = `
      <div role="button"
        class="w-full items-center justify-between gap-7 px-5 py-3.5 rounded-xl shadow-md shadow-shade/5 bg-shade/5">
        <div class="w-full flex-col items-start justify-start gap-1.5">
          <h4 class="text-base text-green font-bold leading-tight line-clamp-2">${serie.title}</h4>
          <p class="text-xs text-shade/55 font-medium">${serie.sheikh}</p>
        </div>
        <div class="w-fit flex-shrink-0 items-center justify-start gap-0.5">
          <h4 class="text-6xl font-bold text-green">${serie.audios}</h4>
          <span class="w-fit flex flex-col items-center justify-center gap-0 text-green font-bold">
            <i class="hgi hgi-stroke hgi-folder-audio text-3xl"></i>
            <span class="text-xs">Audios</span>
          </span>
        </div>
      </div>
    `;

    topic.appendChild(div);
  });
};

fetchSeries();

// change footer year every min
function updateYear() {
  const now = new Date();
  const year = now.getFullYear();
  document.getElementById("date").textContent = year;
}

updateYear();
setInterval(updateYear, 60000);

// audio player
const content = document.getElementById("playing"),
  floatPlay = document.getElementById("float-play"),
  spinner = document.getElementById("spinner"),
  floatPlayBtn = document.getElementById("hgi-play"),
  audioTitle = document.getElementById("audio-title"),
  audioSheikh = document.getElementById("audio-sheikh"),
  playPause = document.getElementById("play-pause"),
  playPauseBtn = document.getElementById("play-pause-btn"),
  Audio = document.getElementById("now-playing"),
  forwards15 = document.getElementById("forwards"),
  backwards15 = document.getElementById("backwards"),
  prevBtn = document.getElementById("hgi-previous"),
  nextBtn = document.getElementById("hgi-next"),
  progressBar = document.getElementById("progress-bar"),
  progressDetails = document.getElementById("progress-details"),
  repeatBtn = document.getElementById("repeat"),
  Playimage = document.getElementById("audio-thumb"),
  timer = document.getElementById("timer");

// hiding the floating player button
window.addEventListener("DOMContentLoaded", () => {
  let clicks = 0;
  playPause.addEventListener("click", () => {
    clicks++;
  });
});

// leaving the player screen
document.getElementById("arrow-back").addEventListener("click", () => {
  content.classList.add("hidden");
  document.querySelector("header").classList.remove("hidden");
  document.querySelector("main").classList.remove("hidden");
  document.querySelector("footer").classList.remove("hidden");

  if (content.classList.contains("hidden")) {
    floatPlay.classList.remove("hidden");
  };
});

floatPlay.addEventListener("dblclick", () => {
  floatPlay.classList.add("hidden");
  pauseDarsu();
  Audio.currentTime = 0;
});

let duruus = [
  {
    title: "Abaffe! Sitaane erina obuyinza ku muntu?",
    sheikh: "Shk. Muhammad Quraysh Mazinga",
    img: "/imgs/thumb1.jpg",
    dars: "/audio/sitaane.m4a"
  },
  {
    title: "Omuntu agezeseddwa n'eddogo akola atya?",
    sheikh: "Shk. Hamzah Kayiira",
    img: "/imgs/thumb2.jpg",
    dars: "/audio/eddogo.mp3"
  },
  {
    title: "Ebituufu ku kiro kya Laylat Al-Qadr",
    sheikh: "Shk. Hamzah Muwonge",
    img: "/imgs/thumb3.jpg",
    dars: "/audio/darsu.aac"
  },
  {
    title: "Tafsīr Sūratul Kahf - Part 60",
    sheikh: "Shk. Abdu-Rrahmaan Mukisa",
    img: "/imgs/thumb4.jpg",
    dars: "/audio/tafsir.mp3"
  }
]

let index = 0;

window.addEventListener("load", () => {
  loadData(index);
});

function loadData(indexValue) {
  audioTitle.innerHTML = duruus[indexValue].title;
  audioSheikh.innerHTML = duruus[indexValue].sheikh;
  Playimage.src = duruus[indexValue].img;
  Audio.src = duruus[indexValue].dars;
}

floatPlay.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  if (!isMusicPaused) {
    pauseDarsu();
    spinner.classList.replace("anim-running", "anim-paused")
    floatPlayBtn.classList.replace("hgi-pause", "hgi-play")
  }
  else {
    playDarsu();
    spinner.classList.replace("anim-paused", "anim-running")
    floatPlayBtn.classList.replace("hgi-play", "hgi-pause")
  }
});

playPause.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  if (!isMusicPaused) {
    pauseDarsu();
    spinner.classList.replace("anim-running", "anim-paused")
    floatPlayBtn.classList.replace("hgi-pause", "hgi-play")
  }
  else {
    playDarsu();
    spinner.classList.replace("anim-paused", "anim-running")
    floatPlayBtn.classList.replace("hgi-play", "hgi-pause")
  }
});

function playDarsu() {
  content.classList.remove("paused");
  playPauseBtn.classList.replace("hgi-play", "hgi-pause");
  Audio.play();
}

function pauseDarsu() {
  content.classList.add("paused");
  playPauseBtn.classList.replace("hgi-pause", "hgi-play");
  Audio.pause();
}


forwards15.addEventListener("click", () => {
  Audio.currentTime += 15;
});

backwards15.addEventListener("click", () => {
  Audio.currentTime -= 15;
  if (Audio.currentTime < 0) Audio.currentTime = 0; // prevent negative time
});

nextBtn.addEventListener("click", () => {
  nextDarsu();
  spinner.classList.replace("anim-paused", "anim-running")
});

prevBtn.addEventListener("click", () => {
  prevDarsu();
  spinner.classList.replace("anim-paused", "anim-running")
});

function nextDarsu() {
  index++;
  if (index >= duruus.length) {
    index = 0;
  }
  else {
    index = index;
  }
  loadData(index);
  playDarsu();
}

function prevDarsu() {
  index--;
  if (index < 0) {
    index = duruus.length - 1;
  }
  else {
    index = index;
  }
  loadData(index);
  playDarsu();
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedHrs = hrs > 0 ? hrs + ":" : "";
  const formattedMins = hrs > 0 ? String(mins).padStart(2, "0") : mins;
  const formattedSecs = String(secs).padStart(2, "0");

  return formattedHrs + formattedMins + ":" + formattedSecs;
}

Audio.addEventListener("timeupdate", (e) => {
  const initialTime = e.target.currentTime; // Get current music time
  const finalTime = e.target.duration; // Get music duration
  let BarWidth = (initialTime / finalTime) * 100;
  progressDetails.style.width = BarWidth + "%";

  progressBar.addEventListener("click", (e) => {
    let progressValue = progressBar.clientWidth; // Get width of Progress Bar
    let clickedOffsetX = e.offsetX; // get offset x value
    let MusicDuration = Audio.duration; // get total music duration

    Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
  });

  //Timer Logic
  let finalTimeData = document.getElementById("play-final");
  let remainingTime = parseInt(e.target.duration, 10) - parseInt(e.target.currentTime, 10);

  timer.addEventListener("click", () => {
    finalTimeData.classList.toggle("display")
  })

  if (!finalTimeData.classList.contains("display")) {
    finalTimeData.innerText = formatTime(finalTime);
  } else {
    finalTimeData.innerText = "-" + formatTime(remainingTime);
  }

  //Update Current Duration
  let currentTimeData = document.getElementById("play-start");
  currentTimeData.innerText = formatTime(initialTime);

  //repeat button logic
  repeatBtn.addEventListener("click", () => {
    Audio.currentTime = 0;
  });
});

Audio.addEventListener("ended", () => {
  index++;
  if (index > duruus.length) {
    index = 0;
  }
  loadData(index);
  playDarsu();
});

