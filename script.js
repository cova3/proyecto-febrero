const tablaJuego = document.querySelector(".tabla-juego");
const puntosElement = document.querySelector(".puntos");
const puntajeMaxElement = document.querySelector(".puntajeMax");

let gameOver = false
let manzanaX, manzanaY
let viboraX = 5, viboraY = 10;
let cuerpoVibora =[];
let velocidadX = 0, velocidadY = 0;
let setIntervalId;
let puntos = 0;

let PuntajeMax = localStorage.getItem("puntajeMax") || 0;
puntajeMaxElement.innerHTML = `PuntajeMax: ${PuntajeMax}`;

const changmanzanaPosition = () => {
    manzanaX = Math.floor(Math.random() * 30) +1;
    manzanaY = Math.floor(Math.random() * 30) +1;
}

const JuegoTerminado = () => {
    clearInterval(setIntervalId);
    alert("Perdiste");
    location.reload();
}

const changDireccion = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1){
        velocidadX = 0;
        velocidadY = -1;
    } else if(e.key === "ArrowDown" && velocidadY != -1){
        velocidadX = 0;
        velocidadY = 1;
    } else if(e.key === "ArrowRight" && velocidadX != -1){
        velocidadX = 1;
        velocidadY = 0;
    } else if(e.key === "ArrowLeft" && velocidadX != 1){
        velocidadX = -1;
        velocidadY = 0;
    }
}

const initGame = () => {
    if(gameOver) return JuegoTerminado();
    let hmtlMarkup = `<div class="manzana" style="grid-area: ${manzanaY} / ${manzanaX}"></div>`;

    if(viboraX === manzanaX && viboraY === manzanaY){
        changmanzanaPosition();
        cuerpoVibora.push([manzanaX, manzanaY]);
        puntos++;

        PuntajeMax = puntos >= PuntajeMax ? puntos : PuntajeMax;
        localStorage.setItem("puntajeMax", PuntajeMax);
        puntosElement.innerHTML = `Puntos: ${puntos}`;

        puntajeMaxElement.innerHTML = `PuntajeMax: ${PuntajeMax}`;
    }
    
    for(let i = cuerpoVibora.length -1; i > 0; i--){
        cuerpoVibora[i] = cuerpoVibora[i-1];
    }
    cuerpoVibora[0] = [viboraX, viboraY];

    viboraX += velocidadX
    viboraY += velocidadY

    if(viboraX <=0 || viboraX > 30 || viboraY <=0 || viboraY > 30){
        gameOver = true;
    }
    
    for(let i = 0; i < cuerpoVibora.length; i++) {
        hmtlMarkup += `<div class="cabeza" style="grid-area: ${cuerpoVibora[i][1]} / ${cuerpoVibora[i][0]}"></div>`;
        if(i !== 0 && cuerpoVibora[0][1] === cuerpoVibora[i][1] && cuerpoVibora[0][0] === cuerpoVibora[i][0]){
            gameOver = true;
        }
    }
    tablaJuego.innerHTML = hmtlMarkup
}

changmanzanaPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changDireccion)