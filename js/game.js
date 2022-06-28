let flippedCard = 0;
let movements = 0;
let hits = 0;
let card_a = null;
let card_b = null;
let a = 0, b = 0;
let timer = 30;
let init_game = false;
let countdown = null;

let stadistic_hits = document.getElementById("hits");
let stadistic_movements = document.getElementById("movements");
let message_congratulations = document.getElementById("congratulation");
let time_remaining = document.getElementById("time-remaining");
let year = new Date().getFullYear();
let date = document.getElementById("date");
date.innerHTML = year;

let soundClick = new Audio('./assets/sounds/click.wav');
let soundWin = new Audio('./assets/sounds/win.wav');
let soundDefeat = new Audio('./assets/sounds/defeat.wav');
let soundHit = new Audio('./assets/sounds/hit.wav');
let soundWrong = new Audio('./assets/sounds/wrong.wav');

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
for (let i = 0; i < numbers.length; i++) {
    document.getElementById(i).style.backgroundColor = "#f34772";
}

function flip(id) {
    if (!init_game) {
        cronometer();
        init_game = true;
    }
    flippedCard++;
    if (flippedCard == 1) {
        card_a = document.getElementById(id);
        card_a.innerHTML = `<img src='./assets/images/${numbers[id]}.png' alt='${numbers[id]}.png'/>`;
        a = numbers[id];
        card_a.disabled = true;
        playSound(soundClick);
    } else if (flippedCard == 2) {
        card_b = document.getElementById(id);
        card_b.innerHTML = `<img src='./assets/images/${numbers[id]}.png' alt='${numbers[id]}.png'/>`;
        b = numbers[id];
        card_b.disabled = true;
        playSound(soundClick);
        if (a == b) {
            hits++;
            card_a.style.backgroundColor = "#5f5ae3";
            card_b.style.backgroundColor = "#5f5ae3";
            flippedCard = 0;
            playSound(soundHit);
        } else {
            card_a.disabled = false;
            card_b.disabled = false;
            playSound(soundWrong);
        }
        movements++;
    } else {
        playSound(soundClick);
        card_a.innerHTML = "";
        card_b.innerHTML = "";
        flippedCard = 0;
    }

    stadistic_hits.innerHTML = "Aciertos: " + hits;
    stadistic_movements.innerHTML = "Movimientos: " + movements;
    if (hits == 8) {
        clearInterval(countdown);
        message_congratulations.innerHTML = "¡Felicidades! Has ganado en " + movements + " movimientos en " + (30 - timer) + " segundos.";
        playSound(soundWin);
    }
}

reset = function () {
    flippedCard = 0;
    hits = 0;
    movements = 0;
    timer = 30;
    init_game = false;
    clearInterval(countdown);
    time_remaining.innerHTML = "Tiempo: " + timer + " segundos";
    stadistic_hits.innerHTML = "Aciertos: " + hits;
    stadistic_movements.innerHTML = "Movimientos: " + movements;
    message_congratulations.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i).style.backgroundColor = "#f34772";
        document.getElementById(i).disabled = false;
    }
    numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numbers = numbers.sort(() => { return Math.random() - 0.5 });
}

cronometer = function () {
    countdown = setInterval(() => {
        timer--;
        time_remaining.innerHTML = "Tiempo: " + timer + " segundos";
        if (timer == 0) {
            disable_cards();
            message_congratulations.innerHTML = "¡Has perdido! Se termino el tiempo.";
            playSound(soundDefeat);
            clearInterval(countdown);
        }
    }, 1000);
}

disable_cards = function () {
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).innerHTML = `<img src='./assets/images/${numbers[i]}.png' alt='${numbers[i]}.png'/>`;
        document.getElementById(i).disabled = true;
    }
}

playSound = function (sound) {
    sound.play();
}