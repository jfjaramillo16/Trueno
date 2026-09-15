// Setlist Oficial del Turr4zo Tour con enlaces e IDs de YouTube
const playlist = [
    { id: 1, title: "CON EL COMBO", ytId: "Ett9Opd_M6k", ytUrl: "https://www.youtube.com/watch?v=Ett9Opd_M6k" },
    { id: 2, title: "Atrevido", ytId: "VOehRh_gMc0", ytUrl: "https://www.youtube.com/watch?v=VOehRh_gMc0" },
    { id: 3, title: "Bzrp Freestyle Sessions", ytId: "Cepdo2GOQZc", ytUrl: "https://www.youtube.com/watch?v=Cepdo2GOQZc" },
    { id: 4, title: "REAL GANGSTA LOVE", ytId: "FCMtx6IRyYY", ytUrl: "https://www.youtube.com/watch?v=FCMtx6IRyYY" },
    { id: 5, title: "1000 HORAS", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+1000+Horas" },
    { id: 6, title: "Mamichula", ytId: "vkcmkw0-JTo", ytUrl: "https://www.youtube.com/watch?v=vkcmkw0-JTo" },
    { id: 7, title: "RAIN IV", ytId: "wW3S9qPXdjI", ytUrl: "https://www.youtube.com/watch?v=wW3S9qPXdjI" },
    { id: 8, title: "FEEL ME??", ytId: "Vk94xwl7HnA", ytUrl: "https://www.youtube.com/watch?v=Vk94xwl7HnA" },
    { id: 9, title: "GRILLZ", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+GRILLZ" },
    { id: 10, title: "FRESH", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+FRESH" },
    { id: 11, title: "90s", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+90s" },
    { id: 12, title: "ESTILO SUDAKA", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+ESTILO+SUDAKA" },
    { id: 13, title: "TRANKY FUNKY", ytId: "9lTY3JqpY9g", ytUrl: "https://www.youtube.com/watch?v=9lTY3JqpY9g" },
    { id: 14, title: "THE ROOF IS ON FIRE", ytId: "nbC073teGbY", ytUrl: "https://www.youtube.com/watch?v=nbC073teGbY" },
    { id: 15, title: "PITY IN THE SKY", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+PITY+IN+THE+SKY" },
    { id: 16, title: "ZOMBI", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+ZOMBI" },
    { id: 17, title: "DELIVERY FREESTYLE", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+DELIVERY+FREESTYLE" },
    { id: 18, title: "ARGENTINA", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+ARGENTINA" },
    { id: 19, title: "PUMAS", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+PUMAS" },
    { id: 20, title: "TIERRA ZANTA", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+TIERRA+ZANTA" },
    { id: 21, title: "Azul y Oro", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+Azul+y+Oro" },
    { id: 22, title: "URUGUAY", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+URUGUAY" },
    { id: 23, title: "X UNAS LLANTAS", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+X+UNAS+LLANTAS" },
    { id: 24, title: "Ñeri", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+Neri" },
    { id: 25, title: "BAILANDO SOLA", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+BAILANDO+SOLA" },
    { id: 26, title: "TURRAZO", ytId: "L2o7rdaWZY4", ytUrl: "https://www.youtube.com/watch?v=L2o7rdaWZY4" },
    { id: 27, title: "FUCK EL POLICE", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+FUCK+EL+POLICE" },
    { id: 28, title: "VIOLENTO", ytId: null, ytUrl: "https://www.youtube.com/results?search_query=Trueno+VIOLENTO" },
    { id: 29, title: "DANCE CRIP", ytId: "gjt-hgr1GMc", ytUrl: "https://www.youtube.com/watch?v=gjt-hgr1GMc" }
];

let activeTrackId = null;

// Elementos del DOM
const modal = document.getElementById("video-modal");
const closeModal = document.getElementById("close-modal");
const iframe = document.getElementById("yt-iframe");
const modalNum = document.getElementById("modal-track-num");
const modalTitle = document.getElementById("modal-track-title");
const btnYt = document.getElementById("btn-external-yt");

// Renderizar las dos columnas
function renderSetlist() {
    const colLeft = document.getElementById("col-left");
    const colRight = document.getElementById("col-right");

    colLeft.innerHTML = "";
    colRight.innerHTML = "";

    playlist.forEach((track, index) => {
        const isActive = track.id === activeTrackId;
        const btn = document.createElement("button");
        btn.className = `track-btn ${isActive ? "active" : ""}`;
        btn.innerHTML = `
      <span class="track-title-wrap">
        <span class="track-num">${track.id}.</span>
        <span>${track.title}</span>
      </span>
      <span class="play-icon">▶</span>
    `;

        btn.addEventListener("click", () => playSongVideo(track));

        if (index < 15) {
            colLeft.appendChild(btn);
        } else {
            colRight.appendChild(btn);
        }
    });
}

// Reproducir video en el modal
function playSongVideo(track) {
    activeTrackId = track.id;
    renderSetlist();

    modalNum.textContent = track.id < 10 ? `0${track.id}` : track.id;
    modalTitle.textContent = track.title;
    btnYt.href = track.ytUrl;

    // Si tiene ID embebible de YouTube, cargarlo en el reproductor
    if (track.ytId) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${track.ytId}?autoplay=1&rel=0`;
        modal.classList.remove("hidden");
    } else {
        // Si es búsqueda o no tiene ID estático directo, abrir pestaña oficial
        window.open(track.ytUrl, "_blank");
    }
}

// Cerrar modal
function stopAndCloseModal() {
    iframe.src = ""; // Detener audio/video
    modal.classList.add("hidden");
}

closeModal.addEventListener("click", stopAndCloseModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) stopAndCloseModal();
});

// Inicializar lista
renderSetlist();