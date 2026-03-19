const main = document.querySelector(".grid-container");
const casillas = document.querySelectorAll(".casilla");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const modalResultados = document.querySelector("#modal-resultados");
const puntuacionFinal = document.querySelector("#puntuacion-final");
const btnReiniciar = document.querySelector("#btn-reiniciar");
const sonidoGolpe = new Audio("./fx/golpe.mp3");
const musicaFondo = new Audio("./fx/musica-fondo.mp3");

let score = 0;
let tiempo = 30;
let intervaloTopo;
let intervaloTiempo;
let casillaActiva = null;
let bloqueado = false;
let musicaIniciada = false;
musicaFondo.loop = true; 
musicaFondo.volume = 0.05;

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

        const audioClon = sonidoGolpe.cloneNode();
        audioClon.volume = 0.10;
        audioClon.play();

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

            puntuacionFinal.textContent = "Puntos: " + score;
            modalResultados.classList.remove("oculto");
        }
    }, 1000);
}

btnReiniciar.addEventListener("click", () => {
    modalResultados.classList.add("oculto");
    
    score = 0;
    tiempo = 30;
    
    iniciarJuego();
});

document.body.addEventListener("click", () => {
    if (!musicaIniciada) {
        musicaFondo.play().catch(error => {
            console.log("La reproducción de audio fue bloqueada por el navegador:", error);
        });
        musicaIniciada = true;
    }
});

window.addEventListener("DOMContentLoaded", iniciarJuego);
