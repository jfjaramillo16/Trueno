const songs = [
    { id: 1, title: "CON EL COMBO", src: "songs/01.mp3" },
    { id: 2, title: "Atrevido", src: "songs/02.mp3" },
    { id: 3, title: "Bzrp Freestyle Sessions", src: "songs/03.mp3" },
    { id: 4, title: "REAL GANGSTA LOVE", src: "songs/04.mp3" },
    { id: 5, title: "1000 HORAS", src: "songs/05.mp3" },
    { id: 6, title: "Mamichula", src: "songs/06.mp3" },
    { id: 7, title: "RAIN IV", src: "songs/07.mp3" },
    { id: 8, title: "FEEL ME??", src: "songs/08.mp3" },
    { id: 9, title: "GRILLZ", src: "songs/09.mp3" },
    { id: 10, title: "FRESH", src: "songs/10.mp3" },
    { id: 11, title: "90s", src: "songs/11.mp3" },
    { id: 12, title: "ESTILO SUDAKA", src: "songs/12.mp3" },
    { id: 13, title: "TRANKY FUNKY", src: "songs/13.mp3" },
    { id: 14, title: "THE ROOF IS ON FIRE", src: "songs/14.mp3" },
    { id: 15, title: "PITY IN THE SKY", src: "songs/15.mp3" },
    { id: 16, title: "ZOMBI", src: "songs/16.mp3" },
    { id: 17, title: "DELIVERY FREESTYLE", src: "songs/17.mp3" },
    { id: 18, title: "ARGENTINA", src: "songs/18.mp3" },
    { id: 19, title: "PUMAS", src: "songs/19.mp3" },
    { id: 20, title: "TIERRA ZANTA", src: "songs/20.mp3" },
    { id: 21, title: "Azul y Oro", src: "songs/21.mp3" },
    { id: 22, title: "URUGUAY", src: "songs/22.mp3" },
    { id: 23, title: "X UNAS LLANTAS", src: "songs/23.mp3" },
    { id: 24, title: "Ñeri", src: "songs/24.mp3" },
    { id: 25, title: "BAILANDO SOLA", src: "songs/25.mp3" },
    { id: 26, title: "TURRAZO", src: "songs/26.mp3" },
    { id: 27, title: "FUCK EL POLICE", src: "songs/27.mp3" },
    { id: 28, title: "VIOLENTO", src: "songs/28.mp3" },
    { id: 29, title: "DANCE CRIP", src: "songs/29.mp3" }
];

let currentIndex = 3; // Inicia en REAL GANGSTA LOVE (Pista 4)

const audio = document.getElementById("audio-player");
const trackTitle = document.getElementById("player-track-title");
const trackNum = document.getElementById("player-track-num");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const progressBar = document.getElementById("progress-bar");

function renderList() {
    const colLeft = document.getElementById("col-left");
    const colRight = document.getElementById("col-right");

    colLeft.innerHTML = "";
    colRight.innerHTML = "";

    songs.forEach((song, idx) => {
        const isCurrent = idx === currentIndex;
        const isPlaying = isCurrent && !audio.paused;

        const btn = document.createElement("button");
        btn.className = `track-item ${isCurrent ? "active" : ""}`;

        btn.innerHTML = `
      <div class="track-left-info">
        <span class="track-num">${song.id}.</span>
        <span class="track-name">${song.title}</span>
      </div>
      ${isPlaying ? `
        <div class="equalizer-wrap">
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
        </div>
      ` : ''}
    `;

        btn.onclick = () => playSong(idx);

        if (idx < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

function playSong(index) {
    currentIndex = index;
    const song = songs[currentIndex];
    trackTitle.textContent = song.title;
    trackNum.textContent = song.id;

    audio.src = song.src;
    audio.play()
        .then(() => {
            btnPlay.textContent = "❚❚";
            renderList();
        })
        .catch((err) => {
            console.log("Esperando interacción o archivo no encontrado:", err);
            btnPlay.textContent = "▶";
            renderList();
        });
}

// Botón Play/Pausa
btnPlay.onclick = () => {
    if (!audio.src) {
        playSong(currentIndex);
        return;
    }

    if (audio.paused) {
        audio.play();
        btnPlay.textContent = "❚❚";
    } else {
        audio.pause();
        btnPlay.textContent = "▶";
    }
    renderList();
};

btnPrev.onclick = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    playSong(prev);
};

btnNext.onclick = () => {
    const next = (currentIndex + 1) % songs.length;
    playSong(next);
};

// Pasar automáticamente al terminar la canción
audio.onended = () => {
    btnNext.click();
};

// Barra de progreso
audio.ontimeupdate = () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
};

// Estado inicial
trackTitle.textContent = songs[currentIndex].title;
trackNum.textContent = songs[currentIndex].id;
audio.src = songs[currentIndex].src;
renderList();