const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEkrkeDMHTn_DwbUbcjFBC2QHzMKrdVEvF3Oh53_Sfm8HfWiWnxeLTd7mss9g74eHs82D4kevRhGRP/pub?output=csv";
// FECHA Y HORA EN TIEMPO REAL
function actualizarFechaHora() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-MX', {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const hora = ahora.toLocaleTimeString('es-MX');

    document.getElementById("fecha-hora").textContent = `${fecha} ${hora}`;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();


// CARGAR CSV DESDE GOOGLE SHEETS
async function cargarDatos() {
    try {
        const respuesta = await fetch(url);
        const texto = await respuesta.text();
        const filas = texto.trim().split("\n").map(f => f.split(","));

        let html = "<table><thead><tr>";

        filas[0].forEach(celda => html += `<th>${celda}</th>`);
        html += "</tr></thead><tbody>";

        for (let i = 1; i < filas.length; i++) {
            html += "<tr>";

            filas[i].forEach((celda, idx) => {
                if (idx === filas[0].length - 1) {

                    // NORMALIZAR NOMBRE DE CLASE
                    const estadoClase = celda.trim().replace(/ /g, "");
                    html += `<td class="${estadoClase}">${celda}</td>`;

                } else {
                    html += `<td>${celda}</td>`;
                }
            });

            html += "</tr>";
        }

        html += "</tbody></table>";

        document.getElementById("tabla").innerHTML = html;

    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

cargarDatos();
setInterval(cargarDatos, 10000); // refresco automático



// ---------------------------- //
// ROTACIÓN DE MULTIMEDIA
// ---------------------------- //

// Detectar si es teléfono
const esMovil = window.innerWidth < 992;

const mediaIzq = [
    "<video src='videos/Video10.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen1.jpg' alt='Imagen 1'>",
    "<video src='videos/Video11.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen2.jpg' alt='Imagen 2'>",
    "<video src='videos/Video12.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen3.png' alt='Imagen 3'>",
    "<video src='videos/Video13.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen4.jpg' alt='Imagen 4'>",
    "<video src='videos/Video14.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen2.jpg' alt='Imagen 5'>",
    "<video src='videos/Video15.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen1.jpg' alt='Imagen 1'>",
    "<video src='videos/Video16.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen2.jpg' alt='Imagen 2'>",
    "<video src='videos/Video17.mp4' autoplay muted loop playsinline preload='auto'></video>",
];

const mediaDer = [
    "<img src='img/Imagen5.jpg' alt='Imagen 5'>",
    "<video src='videos/Video17.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen4.jpg' alt='Imagen 4'>",
    "<video src='videos/Video16.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen3.png' alt='Imagen 3'>",
    "<video src='videos/Video15.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen2.jpg' alt='Imagen 2'>",
    "<video src='videos/Video14.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen1.jpg' alt='Imagen 1'>",
    "<video src='videos/Video13.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen5.jpg' alt='Imagen 5'>",
    "<video src='videos/Video12.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen4.jpg' alt='Imagen 4'>",
    "<video src='videos/Video11.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen2.jpg' alt='Imagen 2'>",
    "<video src='videos/Video10.mp4' autoplay muted loop playsinline preload='auto'></video>",
    "<img src='img/Imagen1.jpg' alt='Imagen 1'>",
];

let idxIzq = 0;
let idxDer = 0;

// Función corregida con delay global
function rotarMultimedia() {
    if (esMovil) return;  // bloquear totalmente en celular

    const contenidoIzq = mediaIzq[idxIzq];
    const contenidoDer = mediaDer[idxDer];

    document.getElementById("media-izq").innerHTML = contenidoIzq;
    document.getElementById("media-der").innerHTML = contenidoDer;

    // definir delay según tipo de contenido
    delayMultimedia = (contenidoIzq.includes("video") || contenidoDer.includes("video"))
        ? 90000
        : 15000;

    idxIzq = (idxIzq + 1) % mediaIzq.length;
    idxDer = (idxDer + 1) % mediaDer.length;
}

let delayMultimedia = 20000;

if (!esMovil) {
    rotarMultimedia();
    setInterval(rotarMultimedia, delayMultimedia);
}
