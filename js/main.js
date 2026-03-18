const main = document.querySelector(".grid-container");
const casillas = document.querySelectorAll(".casilla");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");

let score = 0;
let tiempo = 30;
let intervaloTopo;
let intervaloTiempo;
let casillaActiva = null;
let bloqueado = false;

function obtenerCasillaRandom() {
    const index = Math.floor(Math.random() * casillas.length);
    return casillas[index];
}

function mostrarTopo() {
    if (bloqueado) return;

    if (casillaActiva) {
        casillaActiva.classList.remove("activa");
    }

    const casilla = obtenerCasillaRandom();
    casilla.classList.add("activa");
    casillaActiva = casilla;
}

casillas.forEach((casilla) => {
    casilla.addEventListener("click", () => {
        if (!casilla.classList.contains("activa") || bloqueado) return;

        bloqueado = true;

        const topo = casilla.querySelector(".topo");

        topo.src = "./img/topo-golpeado.png";

        score++;
        scoreDisplay.textContent = "Puntos: " + score;

        // Espera antes de esconderlo
        setTimeout(() => {
            casilla.classList.remove("activa");
            topo.src = "./img/topo.png";
            bloqueado = false;
        }, 800);
    });
});

function iniciarJuego() {
    scoreDisplay.textContent = "Puntos: " + score;
    timeDisplay.textContent = "Tiempo: " + tiempo;
    bloqueado = false;

    intervaloTopo = setInterval(mostrarTopo, 800);

    intervaloTiempo = setInterval(() => {
        tiempo--;
        timeDisplay.textContent = "Tiempo: " + tiempo;

        if (tiempo <= 0) {
            clearInterval(intervaloTopo);
            clearInterval(intervaloTiempo);

            if (casillaActiva) {
                casillaActiva.classList.remove("activa");
            }

            alert("Juego terminado. Puntos: " + score);
        }
    }, 1000);
}

window.addEventListener("DOMContentLoaded", iniciarJuego);
