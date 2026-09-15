// Setlist Oficial del Turr4zo Tour
const playlist = [
    { id: 1, title: "CON EL COMBO", file: "songs/01.mp3" },
    { id: 2, title: "Atrevido", file: "songs/02.mp3" },
    { id: 3, title: "Bzrp Freestyle Sessions", file: "songs/03.mp3" },
    { id: 4, title: "REAL GANGSTA LOVE", file: "songs/04.mp3" },
    { id: 5, title: "1000 HORAS", file: "songs/05.mp3" },
    { id: 6, title: "Mamichula", file: "songs/06.mp3" },
    { id: 7, title: "RAIN IV", file: "songs/07.mp3" },
    { id: 8, title: "FEEL ME??", file: "songs/08.mp3" },
    { id: 9, title: "GRILLZ", file: "songs/09.mp3" },
    { id: 10, title: "FRESH", file: "songs/10.mp3" },
    { id: 11, title: "90s", file: "songs/11.mp3" },
    { id: 12, title: "ESTILO SUDAKA", file: "songs/12.mp3" },
    { id: 13, title: "TRANKY FUNKY", file: "songs/13.mp3" },
    { id: 14, title: "THE ROOF IS ON FIRE", file: "songs/14.mp3" },
    { id: 15, title: "PITY IN THE SKY", file: "songs/15.mp3" },
    { id: 16, title: "ZOMBI", file: "songs/16.mp3" },
    { id: 17, title: "DELIVERY FREESTYLE", file: "songs/17.mp3" },
    { id: 18, title: "ARGENTINA", file: "songs/18.mp3" },
    { id: 19, title: "PUMAS", file: "songs/19.mp3" },
    { id: 20, title: "TIERRA ZANTA", file: "songs/20.mp3" },
    { id: 21, title: "Azul y Oro", file: "songs/21.mp3" },
    { id: 22, title: "URUGUAY", file: "songs/22.mp3" },
    { id: 23, title: "X UNAS LLANTAS", file: "songs/23.mp3" },
    { id: 24, title: "Ñeri", file: "songs/24.mp3" },
    { id: 25, title: "BAILANDO SOLA", file: "songs/25.mp3" },
    { id: 26, title: "TURRAZO", file: "songs/26.mp3" },
    { id: 27, title: "FUCK EL POLICE", file: "songs/27.mp3" },
    { id: 28, title: "VIOLENTO", file: "songs/28.mp3" },
    { id: 29, title: "DANCE CRIP", file: "songs/29.mp3" }
];

let currentIndex = 3; // Inicia en "REAL GANGSTA LOVE"
const audio = document.getElementById("audio-player");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const trackTitle = document.getElementById("track-title");
const trackNumber = document.getElementById("track-number");
const progressBar = document.getElementById("progress-bar");

// Renderizar las 2 columnas
function renderSetlist() {
    const colLeft = document.getElementById("col-left");
    const colRight = document.getElementById("col-right");

    colLeft.innerHTML = "";
    colRight.innerHTML = "";

    playlist.forEach((track, index) => {
        const isActive = index === currentIndex;
        const isPlaying = isActive && !audio.paused;

        const btn = document.createElement("button");
        btn.className = `track-btn ${isActive ? "active" : ""}`;
        btn.innerHTML = `
      <span class="track-title-wrap">
        <span class="track-num">${track.id}.</span>
        <span>${track.title}</span>
      </span>
      ${isPlaying ? `
        <div class="equalizer">
          <span></span><span></span><span></span>
        </div>
      ` : ''}
    `;

        btn.addEventListener("click", () => playTrack(index));

        if (index < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

// Cargar y reproducir pista
function playTrack(index) {
    currentIndex = index;
    const current = playlist[currentIndex];

    trackTitle.textContent = current.title;
    trackNumber.textContent = current.id;
    audio.src = current.file;

    audio.play()
        .then(() => {
            btnPlay.textContent = "❚❚";
        })
        .catch((err) => {
            console.log("Audio no cargado aún o interacción requerida:", err);
            btnPlay.textContent = "▶";
        });

    renderSetlist();
}

// Alternar Play / Pausa
btnPlay.addEventListener("click", () => {
    if (!audio.src) {
        playTrack(currentIndex);
        return;
    }

    if (audio.paused) {
        audio.play();
        btnPlay.textContent = "❚❚";
    } else {
        audio.pause();
        btnPlay.textContent = "▶";
    }
    renderSetlist();
});

// Siguiente y Anterior
btnPrev.addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(prevIndex);
});

btnNext.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(nextIndex);
});

// Al terminar la pista pasa a la siguiente
audio.addEventListener("ended", () => {
    btnNext.click();
});

// Barra de progreso del audio
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }
});

// Inicialización
renderSetlist();