// Setlist Oficial con los IDs de YouTube para reproducir directamente
const songs = [
    { id: 1, title: "CON EL COMBO", ytId: "w310W-QjHzM" },
    { id: 2, title: "Atrevido", ytId: "7u1ALZiemXI" },
    { id: 3, title: "Bzrp Freestyle Sessions", ytId: "Cepdo2GOQZc" },
    { id: 4, title: "REAL GANGSTA LOVE", ytId: "gaxbVfsoF6Q" },
    { id: 5, title: "1000 HORAS", ytId: "wW3S9qPXdjI" },
    { id: 6, title: "Mamichula", ytId: "vkcmkw0-JTo" },
    { id: 7, title: "RAIN IV", ytId: "wW3S9qPXdjI" },
    { id: 8, title: "FEEL ME??", ytId: "5QneBkcNhWw" },
    { id: 9, title: "GRILLZ", ytId: "9lTY3JqpY9g" },
    { id: 10, title: "FRESH", ytId: "nbC073teGbY" },
    { id: 11, title: "90s", ytId: "gaxbVfsoF6Q" },
    { id: 12, title: "ESTILO SUDAKA", ytId: "w310W-QjHzM" },
    { id: 13, title: "TRANKY FUNKY", ytId: "9lTY3JqpY9g" },
    { id: 14, title: "THE ROOF IS ON FIRE", ytId: "nbC073teGbY" },
    { id: 15, title: "PITY IN THE SKY", ytId: "5QneBkcNhWw" },
    { id: 16, title: "ZOMBI", ytId: "w310W-QjHzM" },
    { id: 17, title: "DELIVERY FREESTYLE", ytId: "Cepdo2GOQZc" },
    { id: 18, title: "ARGENTINA", ytId: "vkcmkw0-JTo" },
    { id: 19, title: "PUMAS", ytId: "w310W-QjHzM" },
    { id: 20, title: "TIERRA ZANTA", ytId: "3jzW6yy1qAk" },
    { id: 21, title: "Azul y Oro", ytId: "7u1ALZiemXI" },
    { id: 22, title: "URUGUAY", ytId: "Cepdo2GOQZc" },
    { id: 23, title: "X UNAS LLANTAS", ytId: "w310W-QjHzM" },
    { id: 24, title: "Ñeri", ytId: "7u1ALZiemXI" },
    { id: 25, title: "BAILANDO SOLA", ytId: "gaxbVfsoF6Q" },
    { id: 26, title: "TURRAZO", ytId: "w310W-QjHzM" },
    { id: 27, title: "FUCK EL POLICE", ytId: "7u1ALZiemXI" },
    { id: 28, title: "VIOLENTO", ytId: "9lTY3JqpY9g" },
    { id: 29, title: "DANCE CRIP", ytId: "wMQgX8dm630" }
];

let currentIndex = 3; // Inicia en REAL GANGSTA LOVE
let ytPlayer = null;
let isPlaying = false;

const trackTitle = document.getElementById("player-track-title");
const trackNum = document.getElementById("player-track-num");
const trackStatus = document.getElementById("player-status");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// Función global que llama YouTube cuando su script está listo
window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("hidden-youtube-player", {
        height: "200",
        width: "200",
        videoId: songs[currentIndex].ytId,
        playerVars: {
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
};

function onPlayerReady() {
    trackStatus.textContent = "Listo para sonar";
}

function onPlayerStateChange(event) {
    // 1 = Reproduciendo, 2 = Pausado, 0 = Terminado
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        btnPlay.textContent = "❚❚";
        trackStatus.textContent = "Reproduciendo en vivo • YouTube Audio";
        renderList();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        btnPlay.textContent = "▶";
        trackStatus.textContent = "Pausado";
        renderList();
    } else if (event.data === YT.PlayerState.ENDED) {
        btnNext.click(); // Siguiente canción automática
    }
}

function renderList() {
    const colLeft = document.getElementById("col-left");
    const colRight = document.getElementById("col-right");

    colLeft.innerHTML = "";
    colRight.innerHTML = "";

    songs.forEach((song, idx) => {
        const isCurrent = idx === currentIndex;
        const btn = document.createElement("button");
        btn.className = `track-item ${isCurrent ? "active" : ""}`;

        btn.innerHTML = `
      <div class="track-left-info">
        <span class="track-num">${song.id}.</span>
        <span class="track-name">${song.title}</span>
      </div>
      ${isCurrent && isPlaying ? `
        <div class="equalizer-wrap">
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
        </div>
      ` : ''}
    `;

        // Al hacer clic sobre cualquier canción, empieza a sonar inmediatamente
        btn.onclick = () => selectAndPlaySong(idx);

        if (idx < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

function selectAndPlaySong(index) {
    currentIndex = index;
    const song = songs[currentIndex];
    trackTitle.textContent = song.title;
    trackNum.textContent = song.id;

    if (ytPlayer && ytPlayer.loadVideoById) {
        trackStatus.textContent = "Cargando audio...";
        ytPlayer.loadVideoById(song.ytId);
        ytPlayer.playVideo();
    }
    renderList();
}

// Botón Play / Pausa central
btnPlay.onclick = () => {
    if (!ytPlayer || !ytPlayer.getPlayerState) return;

    if (isPlaying) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
};

btnPrev.onclick = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    selectAndPlaySong(prev);
};

btnNext.onclick = () => {
    const next = (currentIndex + 1) % songs.length;
    selectAndPlaySong(next);
};

// Renderizar setlist inicial
renderList();