// app.js
const songs = [
    { id: 1, title: "CON EL COMBO", src: "songs/01.mp3" },
    { id: 2, title: "ATREVIDO", src: "songs/02.mp3" },
    { id: 3, title: "BZRP FREESTYLE SESSIONS", src: "songs/03.mp3" },
    { id: 4, title: "REAL GANGSTA LOVE", src: "songs/04.mp3" },
    { id: 5, title: "1000 HORAS", src: "songs/05.mp3" },
    { id: 6, title: "MAMICHULA", src: "songs/06.mp3" },
    { id: 7, title: "RAIN IV", src: "songs/07.mp3" },
    { id: 8, title: "FEEL ME??", src: "songs/08.mp3" },
    { id: 9, title: "GRILLZ", src: "songs/09.mp3" },
    { id: 10, title: "FRESH", src: "songs/10.mp3" },
    { id: 11, title: "90S", src: "songs/11.mp3" },
    { id: 12, title: "ESTILO SUDAKA", src: "songs/12.mp3" },
    { id: 13, title: "TRANKY FUNKY", src: "songs/13.mp3" },
    { id: 14, title: "THE ROOF IS ON FIRE", src: "songs/14.mp3" },
    { id: 15, title: "PITY IN THE SKY", src: "songs/15.mp3" },
    { id: 16, title: "ZOMBI", src: "songs/16.mp3" },
    { id: 17, title: "DELIVERY FREESTYLE", src: "songs/17.mp3" },
    { id: 18, title: "ARGENTINA", src: "songs/18.mp3" },
    { id: 19, title: "PUMAS", src: "songs/19.mp3" },
    { id: 20, title: "TIERRA ZANTA", src: "songs/20.mp3" },
    { id: 21, title: "AZUL Y ORO", src: "songs/21.mp3" },
    { id: 22, title: "URUGUAY", src: "songs/22.mp3" },
    { id: 23, title: "X UNAS LLANTAS", src: "songs/23.mp3" },
    { id: 24, title: "ÑERI", src: "songs/24.mp3" },
    { id: 25, title: "BAILANDO SOLA", src: "songs/25.mp3" },
    { id: 26, title: "TURRAZO", src: "songs/26.mp3" },
    { id: 27, title: "FUCK EL POLICE", src: "songs/27.mp3" },
    { id: 28, title: "VIOLENTO", src: "songs/28.mp3" },
    { id: 29, title: "DANCE CRIP", src: "songs/29.mp3" }
];

let currentIndex = 0;
let isAudioPlaying = false;

const audio = document.getElementById("audio-player");
const trackTitle = document.getElementById("track-title");
const trackNum = document.getElementById("track-number");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const progressBar = document.getElementById("progress-bar");

// Configuración de pantalla del Auto / Bluetooth / Notificación del móvil
function updateCarDisplay(song) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: `${song.id}. ${song.title}`,
            artist: 'Para Xio <3',          // <-- Aquí va lo de abajo en tu auto
            album: 'Turr4zo World Tour',
            artwork: [
                { src: 'trueno_card.jpg', sizes: '512x512', type: 'image/jpeg' }
            ]
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            if (btnPrev) btnPrev.click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            if (btnNext) btnNext.click();
        });
        navigator.mediaSession.setActionHandler('play', () => {
            if (audio) audio.play();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            if (audio) audio.pause();
        });
    }
}

function renderList() {
    const colLeft = document.getElementById("col-left");
    const colRight = document.getElementById("col-right");

    if (!colLeft || !colRight) return;

    colLeft.innerHTML = "";
    colRight.innerHTML = "";

    songs.forEach((song, idx) => {
        const isCurrent = idx === currentIndex;
        const isPlaying = isCurrent && isAudioPlaying;

        const btn = document.createElement("button");
        btn.type = "button";
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

        btn.onclick = () => selectAndPlay(idx);

        if (idx < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

function selectAndPlay(index) {
    currentIndex = index;
    const song = songs[currentIndex];

    if (trackTitle) trackTitle.textContent = song.title;
    if (trackNum) trackNum.textContent = song.id;
    if (btnPlay) btnPlay.textContent = "▶";
    isAudioPlaying = false;
    renderList();

    // Actualiza la pantalla del auto
    updateCarDisplay(song);

    if (!audio) return;

    audio.pause();
    audio.src = song.src;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isAudioPlaying = true;
                if (btnPlay) btnPlay.textContent = "❚❚";
                renderList();
            })
            .catch((error) => {
                console.warn(`Archivo ${song.src} pendiente:`, error.message);
                isAudioPlaying = false;
                if (btnPlay) btnPlay.textContent = "▶";
                renderList();
            });
    }
}

if (btnPlay) {
    btnPlay.onclick = () => {
        if (!audio.src || audio.src === window.location.href) {
            selectAndPlay(currentIndex);
            return;
        }

        if (audio.paused) {
            audio.play()
                .then(() => {
                    isAudioPlaying = true;
                    btnPlay.textContent = "❚❚";
                    renderList();
                })
                .catch((err) => console.warn(err));
        } else {
            audio.pause();
            isAudioPlaying = false;
            btnPlay.textContent = "▶";
            renderList();
        }
    };
}

if (btnPrev) {
    btnPrev.onclick = () => {
        const prev = (currentIndex - 1 + songs.length) % songs.length;
        selectAndPlay(prev);
    };
}

if (btnNext) {
    btnNext.onclick = () => {
        const next = (currentIndex + 1) % songs.length;
        selectAndPlay(next);
    };
}

if (audio) {
    audio.onended = () => {
        if (btnNext) btnNext.click();
    };

    audio.ontimeupdate = () => {
        if (audio.duration && progressBar) {
            const pct = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${pct}%`;
        }
    };
}

// Inicia en la canción 1 y configura el auto
selectAndPlay(0);