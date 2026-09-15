// Setlist Oficial del Concierto con enlaces directos a YouTube
const songs = [
    { id: 1, title: "CON EL COMBO", yt: "https://www.youtube.com/watch?v=Ett9Opd_M6k" },
    { id: 2, title: "Atrevido", yt: "https://www.youtube.com/watch?v=VOehRh_gMc0" },
    { id: 3, title: "Bzrp Freestyle Sessions", yt: "https://www.youtube.com/watch?v=Cepdo2GOQZc" },
    { id: 4, title: "REAL GANGSTA LOVE", yt: "https://www.youtube.com/watch?v=FCMtx6IRyYY" },
    { id: 5, title: "1000 HORAS", yt: "https://www.youtube.com/results?search_query=Trueno+1000+Horas" },
    { id: 6, title: "Mamichula", yt: "https://www.youtube.com/watch?v=vkcmkw0-JTo" },
    { id: 7, title: "RAIN IV", yt: "https://www.youtube.com/watch?v=wW3S9qPXdjI" },
    { id: 8, title: "FEEL ME??", yt: "https://www.youtube.com/watch?v=Vk94xwl7HnA" },
    { id: 9, title: "GRILLZ", yt: "https://www.youtube.com/results?search_query=Trueno+GRILLZ" },
    { id: 10, title: "FRESH", yt: "https://www.youtube.com/results?search_query=Trueno+FRESH" },
    { id: 11, title: "90s", yt: "https://www.youtube.com/results?search_query=Trueno+90s" },
    { id: 12, title: "ESTILO SUDAKA", yt: "https://www.youtube.com/results?search_query=Trueno+ESTILO+SUDAKA" },
    { id: 13, title: "TRANKY FUNKY", yt: "https://www.youtube.com/watch?v=9lTY3JqpY9g" },
    { id: 14, title: "THE ROOF IS ON FIRE", yt: "https://www.youtube.com/watch?v=nbC073teGbY" },
    { id: 15, title: "PITY IN THE SKY", yt: "https://www.youtube.com/results?search_query=Trueno+PITY+IN+THE+SKY" },
    { id: 16, title: "ZOMBI", yt: "https://www.youtube.com/results?search_query=Trueno+ZOMBI" },
    { id: 17, title: "DELIVERY FREESTYLE", yt: "https://www.youtube.com/results?search_query=Trueno+DELIVERY+FREESTYLE" },
    { id: 18, title: "ARGENTINA", yt: "https://www.youtube.com/results?search_query=Trueno+ARGENTINA" },
    { id: 19, title: "PUMAS", yt: "https://www.youtube.com/results?search_query=Trueno+PUMAS" },
    { id: 20, title: "TIERRA ZANTA", yt: "https://www.youtube.com/results?search_query=Trueno+TIERRA+ZANTA" },
    { id: 21, title: "Azul y Oro", yt: "https://www.youtube.com/results?search_query=Trueno+Azul+y+Oro" },
    { id: 22, title: "URUGUAY", yt: "https://www.youtube.com/results?search_query=Trueno+URUGUAY" },
    { id: 23, title: "X UNAS LLANTAS", yt: "https://www.youtube.com/results?search_query=Trueno+X+UNAS+LLANTAS" },
    { id: 24, title: "Ñeri", yt: "https://www.youtube.com/results?search_query=Trueno+Neri" },
    { id: 25, title: "BAILANDO SOLA", yt: "https://www.youtube.com/results?search_query=Trueno+BAILANDO+SOLA" },
    { id: 26, title: "TURRAZO", yt: "https://www.youtube.com/watch?v=L2o7rdaWZY4" },
    { id: 27, title: "FUCK EL POLICE", yt: "https://www.youtube.com/results?search_query=Trueno+FUCK+EL+POLICE" },
    { id: 28, title: "VIOLENTO", yt: "https://www.youtube.com/results?search_query=Trueno+VIOLENTO" },
    { id: 29, title: "DANCE CRIP", yt: "https://www.youtube.com/watch?v=gjt-hgr1GMc" }
];

let currentIndex = 3; // Inicia seleccionado "REAL GANGSTA LOVE" (índice 3 = tema 4)

const trackTitle = document.getElementById("player-track-title");
const trackNum = document.getElementById("player-track-num");
const btnYtPlay = document.getElementById("btn-yt-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

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
      ${isCurrent ? `
        <div class="equalizer-wrap">
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
          <span class="equalizer-bar"></span>
        </div>
      ` : ''}
    `;

        btn.onclick = () => selectSong(idx);

        if (idx < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

function selectSong(index) {
    currentIndex = index;
    const song = songs[currentIndex];
    trackTitle.textContent = song.title;
    trackNum.textContent = song.id;
    btnYtPlay.href = song.yt;
    renderList();
}

btnPrev.onclick = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    selectSong(prev);
};

btnNext.onclick = () => {
    const next = (currentIndex + 1) % songs.length;
    selectSong(next);
};

// Cargar la lista al iniciar
renderList();