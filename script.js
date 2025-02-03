// Data lagu berdasarkan mood
const musicData = {
  happy: [
    { name: "Suno (AI) - Terbang Tinggi", file: "songs/happy/lagu1.mp3" },
    { name: "Suno (AI) - Langit Cerah Penuh Warna", file: "songs/happy/lagu2.mp3" },
    { name: "Suno (AI) - Pertualangan di siang hari", file: "songs/happy/lagu2.mp3" },
  ],
  angry: [
    { name: "Suno (AI) - Angin Marah", file: "songs/mad/lagu1.mp3" },
    { name: "Suno (AI) - Terjepit deadline", file: "songs/mad/lagu1.mp3" },
    { name: "Suno (AI) - Terbakar Amarah", file: "songs/mad/lagu1.mp3" },
  ],
  sad: [
    { name: "Suno (AI) - Ibuku Sayang", file: "songs/sad/lagu1.mp3" },
    { name: "Suno (AI) - Kerja Ayah", file: "songs/sad/lagu2.mp3" },
    { name: "Suno (AI) - Robot Mendayu", file: "songs/sad/lagu3.mp3" },
  ],
};

// Ambil elemen DOM
const happyDiv = document.getElementById("happy");
const angryDiv = document.getElementById("angry");
const sadDiv = document.getElementById("sad");
const happyMobileDiv = document.getElementById("happy-mobile");
const angryMobileDiv = document.getElementById("angry-mobile");
const sadMobileDiv = document.getElementById("sad-mobile");
const songList = document.getElementById("song-list");
const audioPlayer = document.getElementById("audio-player");

// Fungsi untuk menampilkan daftar lagu
function showPlaylist(mood) {
  const songs = musicData[mood];
  songList.innerHTML = songs
    .map(
      (song) => `
    <li onclick="playSong('${song.file}')">${song.name}</li>
  `
    )
    .join("");

  const playlistElement = document.getElementById("playlist");
  playlistElement.classList.add("show");
}

// Modify playSong function to scroll to audio player
function playSong(file) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = file;
  audioPlayer.style.display = "block";
  audioPlayer.play();

  // Scroll to audio player smoothly
  audioPlayer.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// Event listener untuk div mood (desktop)
happyDiv.addEventListener("click", () => showPlaylist("happy"));
angryDiv.addEventListener("click", () => showPlaylist("angry"));
sadDiv.addEventListener("click", () => showPlaylist("sad"));

// Event listener untuk div mood (mobile)
happyMobileDiv.addEventListener("click", () => showPlaylist("happy"));
angryMobileDiv.addEventListener("click", () => showPlaylist("angry"));
sadMobileDiv.addEventListener("click", () => showPlaylist("sad"));

// Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  const carouselItems = document.querySelector(".carousel-items");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const carouselDots = document.querySelector(".carousel-dots");

  // Create dots
  const items = document.querySelectorAll(".carousel-item");
  items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("data-index", index);
    carouselDots.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  let currentIndex = 0;
  const totalItems = items.length;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselItems.style.transform = `translateX(${offset}%)`;

    // Update active dot
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  // Event listeners for next and prev buttons
  nextBtn.addEventListener("click", goToNext);
  prevBtn.addEventListener("click", goToPrev);

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.getAttribute("data-index"));
      updateCarousel();
    });
  });
});
