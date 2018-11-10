//  for secuence order of lights
let order = [];
//  for players order in pressed light
let playerOrder = [];
//  number of flashes that apprear in game ???
let flash;
//  to kkep track of what turn we are on ???
let turn;
//  boolean, true or false, has the player hit the right colors or not
let good;
//  also a boolean, to see who's turn it is, player's or comp's
let compTurn;
let intervalId;
//  is strick button checked or not
let strict = false;
let noise = true;
//  power button ON or OFF
let on = false;
//  has the player won or not 
let win;

//  counter of correct guesses
const turnCounter = document.querySelector('#turn');
//  4 color fields
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
//  buttons
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

//  starting with programing game buttons functionality
strictButton.addEventListener('click', (event) => {
    if(strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if(onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = '-';
    } else {
        on = false;
        turnCounter.innerHTML = '';
        clearColor();
        //  stops the game 
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if(on || win) {
        play();
    }
});

//  play function to play/start the game
function play() {
    //  reset everything if you play again
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    //  to fill out order with random color secuence that will flash during the game
    for(let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    //  computer is flashing lights
    compTurn = true;

    //  gameTurn function will flash lights every 800 ms
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    //  to prevent player from clicking while computer is flasing lights
    on = false;

    if(flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if(compTurn) {
        clearColor();
        setTimeout(() => {
            //  flashing colors top left/right and bot
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

//  functions for flashing colors and playing sounds
function one() {
    if(noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
    if(noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
}

function three() {
    if(noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow';
}

function four() {
    if(noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomLeft.style.backgroundColor = 'goldenrod';
    bottomRight.style.backgroundColor = 'darkblue';
}

function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'tomato';
    bottomLeft.style.backgroundColor = 'yellow';
    bottomRight.style.backgroundColor = 'lightskyblue';
}


topLeft.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(3);
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if(on) {
        playerOrder.push(4);
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});


//  function that checks if a player clicked in the right order
function check() {
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;
    
    //  to see if player wins the game
    if(playerOrder.length == 20 && good) {
        winGame();
    }

    //  to check if player is correct
    if(good == false) {
        flashColor();
        turnCounter.innerHTML = 'NO!';
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    //  if players hasnot won yet but is correct
    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}


function winGame() {
    flashColor();
    turnCounter.innerHTML = 'WIN!';
    on = false;
    win = true;
}