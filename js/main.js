const casillas = document.querySelectorAll(".casilla");
const scoreDisplay = document.createElement("p");
const timeDisplay = document.createElement("p");

let score = 0;
let tiempo = 30;
let intervaloTopo;
let intervaloTiempo;
let casillaActiva = null;

scoreDisplay.textContent = "Puntos: 0";
timeDisplay.textContent = "Tiempo: 30";

document.body.insertBefore(scoreDisplay, document.querySelector(".grid"));
document.body.insertBefore(timeDisplay, document.querySelector(".grid"));

function obtenerCasillaRandom() {
  const index = Math.floor(Math.random() * casillas.length);
  return casillas[index];
}

function mostrarTopo() {
  if (casillaActiva) {
    casillaActiva.classList.remove("activa");
  }

  const casilla = obtenerCasillaRandom();
  casilla.classList.add("activa");
  casillaActiva = casilla;
}

casillas.forEach(casilla => {
  casilla.addEventListener("click", () => {
    if (!casilla.classList.contains("activa")) return;

    const topo = casilla.querySelector(".topo");

    topo.src = "../img/topo-golpeado.png";
    score++;
    scoreDisplay.textContent = "Puntos: " + score;

    casilla.classList.remove("activa");

    setTimeout(() => {
      topo.src = "../img/topo.png";
    }, 300);
  });
});

function iniciarJuego() {
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

iniciarJuego();