const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEkrkeDMHTn_DwbUbcjFBC2QHzMKrdVEvF3Oh53_Sfm8HfWiWnxeLTd7mss9g74eHs82D4kevRhGRP/pub?gid=0&single=true&output=csv"; // <-- Pega aquí el enlace CSV publicado desde Google Sheets

// Actualizar fecha y hora en vivo
function actualizarFechaHora() {
    const ahora = new Date();
    const opciones = {
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    const fecha = ahora.toLocaleDateString('es-MX', opciones);
    const hora = ahora.toLocaleTimeString('es-MX');
    document.getElementById("fecha-hora").textContent = `${fecha} ${hora}`;
}
setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

// Cargar datos de Google Sheets
async function cargarDatos() {
    try {
        const respuesta = await fetch(url);
        const texto = await respuesta.text();
        const filas = texto.trim().split("\n").map(f => f.split(","));

        let html = "<table><tr>";
        filas[0].forEach(celda => html += `<th>${celda}</th>`);
        html += "</tr>";

        for (let i = 1; i < filas.length; i++) {
            html += "<tr>";
            filas[i].forEach((celda, idx) => {
                if (idx === filas[0].length - 1) {
                    // Última columna = Estado
                    const estadoClase = celda.trim().replace(/\s+/g, "\\ ");
                    html += `<td class="${estadoClase}">${celda}</td>`;
                } else {
                    html += `<td>${celda}</td>`;
                }
            });
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("tabla").innerHTML = html;
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

cargarDatos();
setInterval(cargarDatos, 10000); // Actualiza cada 10 segundos

// --- Rotar publicidad (imágenes/videos) ---
const publicidadIzq = [
    "<video src='videos/Rifamoto.mp4' autoplay muted loop></video>",
    "<img src='img/TorneoFuerza160825.jpeg'>",
    "<video src='videos/Sportsclubbonachon.mp4' autoplay muted loop></video>"
];
const publicidadDer = [
    "<video src='videos/Rifapantalla.mp4' autoplay muted loop></video>",
    "<video src='videos/Torneofuerza160825.mp4' autoplay muted loop></video>",
    "<video src='videos/Sportsclubbonachon2.mp4' autoplay muted loop></video>"
];

let idxIzq = 0,
    idxDer = 0;

function rotarPublicidad() {
    document.getElementById("publicidad-izq").innerHTML = publicidadIzq[idxIzq];
    document.getElementById("publicidad-der").innerHTML = publicidadDer[idxDer];
    idxIzq = (idxIzq + 1) % publicidadIzq.length;
    idxDer = (idxDer + 1) % publicidadDer.length;
}

rotarPublicidad();
setInterval(rotarPublicidad, 90000); // cambia cada 90 segundos