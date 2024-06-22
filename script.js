// Variables
let pointsPlayer = 0; // Puntos del jugador
let pointsComputer = 0; // Puntos de la computadora
let attempts = 3; // Intentos

// DOM elementos
let containerPlayerPoints = document.querySelector(".player_points"); // Puntos del jugador
let containerComputerPoints = document.querySelector(".computer_points"); // Puntos de la computadora
let containerTitleWinner = document.querySelector(".title_winner"); // Título del ganador
let containerInput = document.querySelector(".container_input"); // Contenedor de los intentos
let containerWindowWin = document.querySelector(".container_window_win"); // Ventana de ganador
let titleWin = document.querySelector(".title_win"); // Título de ganador
let imgPlayerHand = document.getElementById("player_hand_image"); // Imagen de la mano del jugador
let selectionPlayer = imgPlayerHand.nextElementSibling; // Selección del jugador
let imgComputerHand = document.getElementById("computer_hand_image"); // Imagen de la mano de la computadora
let selectionComputer = imgComputerHand.nextElementSibling; // Selección de la computadora
let buttonsOptions = document.querySelectorAll(".option"); // Botones de opciones del jugador retornados en un NodeList

buttonsOptions.forEach((button) => {
  button.addEventListener("click", startAttempt); // Agregamos un evento click a cada botón
});

// Función para deshabilitar los botones de opciones del jugador
function disableOptionsButtons() {
  buttonsOptions.forEach((button) => {
    button.disabled = true; // Deshabilitamos el botón
  });
}

// Función para habilitar los botones de opciones del jugador
function enableOptionsButtons() {
  buttonsOptions.forEach((button) => {
    button.disabled = false; // Habilitamos el botón
  });
}

// Función que retorna la opción de la computadora
function computerPlay() {
  let options = ["rock", "paper", "scissors"];
  let randomOption = Math.floor(Math.random() * options.length);
  return options[randomOption];
}

// Función que compara las opciones del jugador y la computadora y retorna el ganador
function compareOptions(optionPlayer, optionComputer) {
  if (optionPlayer === optionComputer) {
    return "draw";
  } else if (
    (optionPlayer === "rock" && optionComputer === "scissors") ||
    (optionPlayer === "paper" && optionComputer === "rock") ||
    (optionPlayer === "scissors" && optionComputer === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

// Función que inicia la animación de las manos del jugador y la computadora
function animationHands() {
  // Deshabilitar botones durante la animación
  disableOptionsButtons();

  // Iniciar animación de las manos
  imgPlayerHand.classList.add("shake_player");
  imgComputerHand.classList.add("shake_computer");

  // Después de 2 segundos, detener la animación y habilitar botones nuevamente
  setTimeout(() => {
    imgPlayerHand.classList.remove("shake_player");
    imgComputerHand.classList.remove("shake_computer");

    // Habilitar botones después de la animación
    enableOptionsButtons();
  }, 2000);
}

// Función que actualiza los puntos del jugador y la computadora
function updatePoints(winner) {
  if (winner === "player") {
    pointsPlayer++;
  } else if (winner === "computer") {
    pointsComputer++;
  }

  containerPlayerPoints.textContent = pointsPlayer;
  containerComputerPoints.textContent = pointsComputer;
}

// Funcion que escribe quien va ganando
function whoIsWinning() {
  if (pointsPlayer > pointsComputer) {
    containerTitleWinner.textContent = "Jugador va ganando!";
  } else if (pointsPlayer < pointsComputer) {
    containerTitleWinner.textContent = "Computador va ganando!";
  } else {
    containerTitleWinner.textContent = "Empate!";
  }
}

//funcion que cambia las imagenes de las manos
function changeHandsImages(optionPlayer, optionComputer) {
  imgPlayerHand.src = `assets/${optionPlayer}.png`;
  selectionPlayer.textContent = `${optionPlayer}`;
  imgComputerHand.src = `assets/${optionComputer}.png`;
  selectionComputer.textContent = `${optionComputer}`;
}

//funcion que cambia el parrafo de los intentos
function changeAttemptsParagraph() {
  let paragraph = document.getElementById("p_attempts");
  paragraph.textContent = `Intentos restantes: ${attempts}`;
}

// Función que se ejecuta cuando se hace clic en un botón de opción del jugador para iniciar un intento
function startAttempt(event) {
  attempts--;
  // Iniciamos animación de la mano del jugador y la computadora
  animationHands();
  let optionPlayer = event.currentTarget.id; // Obtenemos la opción del jugador (obteniendo el id del botón)
  let optionComputer = computerPlay(); // Obtenemos la opción de la computadora
  changeAttemptsParagraph();
  // Esta función se ejecuta después de 2 segundos, recibe una función callback
  setTimeout(() => {
    let winner = compareOptions(optionPlayer, optionComputer); // Obtenemos el ganador del intento
    console.log(winner);
    changeHandsImages(optionPlayer, optionComputer); // Cambiamos las imágenes de las manos
    updatePoints(winner); // Actualizamos los puntos
    whoIsWinning(); // Mostramos quien va ganando
    checkWinnerFinish(); // Comprobamos si hay un ganador
  }, 2000);
}

//funcion que obtiene el numero de intentos
function getAttempts() {
  let inputAttempts = document.getElementById("attempts").value;
  attempts = parseInt(inputAttempts);
  console.log(attempts);
  changeAttemptsParagraph();
  if (attempts <= 0 || isNaN(attempts)) {
    alert("El número de intentos debe ser mayor a 0");
  } else {
    containerInput.style.display = "none";
  }
}

//funcion que comprueba si hay un ganador
function checkWinnerFinish() {
  if (attempts === 0) {
    if (pointsPlayer > pointsComputer) {
      containerWindowWin.style.display = "flex";
    } else if (pointsPlayer < pointsComputer) {
      containerWindowWin.style.display = "flex";

      titleWin.textContent = "Computador ha ganado!";
    } else {
      containerWindowWin.style.display = "flex";

      titleWin.textContent = "Empate!";
    }
  }
}

//funcion que reinicia el juego
function restartGame() {
  window.location.reload();
}
