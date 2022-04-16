class Player {
    constructor(name, XorO) {
        this.name = name;
        this.XorO = XorO.toUpperCase(); 
        this.currentMove = false;
    }
} 

class PlayGame {
    constructor(board) {
        this.players = [];
        this.currentMoveCount = 1;
        this.currentBoard = board;
    }
    startGame () {
        // create players
        const p1 = new Player(prompt('Player 1 name?'), prompt('X or O?'));
        const p2 = new Player(prompt('Player 2 name?'), prompt('X or O?')); 
        this.players.push(p1);
        this.players.push(p2);

        // set initial turn 
        for ( let p of this.players ) {
            p.XorO === 'X' ? p.currentMove = true : p.currentMove = false; // ternary operators = if else statements 
            // 1st part is conditional ? if true do something : if false do something 
            if ( p.currentMove === true ) {
                h2.innerText =`${p.name}'s turn`
            }
        }
    }
    setPlayerTurn () {
        for ( let p of this.players ) {
            p.currentMove === false ? p.currentMove = true : p.currentMove = false;
            if ( p.currentMove === true ) {
                h2.innerText = `${p.name}'s turn!`
            }
        }
    }
}

const gameState = new Map([ // key: value 
    ['sq1', ''], // sq1 is the key and the value is set to '' right now
    ['sq2', ''],
    ['sq3', ''],
    ['sq4', ''],
    ['sq5', ''],
    ['sq6', ''],
    ['sq7', ''],
    ['sq8', ''],
    ['sq9', '']
])

// add event listeners to game board
const divContainer = document.getElementById("main"); // set for the bootstrap container
const h2 = document.getElementById("player-turn");
const restartGame = document.getElementById('restartButton')
const alertDiv= document.getElementById('alertDiv')

// get game started
const game = new PlayGame(gameState);
game.startGame();


divContainer.addEventListener('click', (evt) => {//evt represents the "event" 
    // evt.target will tell me what I clicked on.
    // console.log(evt.target);
    if (alertDiv.innerHTML == ''){
        evt.target.innerText === '' ? markSpace (evt.target) : alert('Too bad. Try again.');
    } else{
        alert('Game is over.. Reloading.')     
        document.location.reload(true);

    }
})

restartGame.addEventListener('click', (evt) => {
    document.location.reload(true);
})


function markSpace (e) {
    console.log(game.players);
    let idValue = e.getAttribute('id');
    let currentSquare = document.getElementById(idValue);
    // console.log(currentSquare);
    // check to see which player is moving and then set the box to their character
    game.players[0].currentMove === true // ternary operator 
        ? currentSquare.innerText = game.players[0].XorO 
        : currentSquare.innerText = game.players[1].XorO
    console.log(game.currentMoveCount);
    game.setPlayerTurn();
    updateGameState(idValue, currentSquare.innerText);
    console.log(gameState.values());
    if ( game.currentMoveCount >= 5) {
        // some method to checkForWin
        whoWon();
        if ((game.currentMoveCount == 9) && (alertDiv.innerHTML == '')) {
            alertDiv.innerHTML = `<div class="alert alert-danger" role="alert"> The Game is tied! </div>`

        }
    }
    game.currentMoveCount++;
}

function updateGameState(id, square) {
    gameState.forEach( (v, k) => {
        if ( k === id ) { gameState.set( k, square ) }
    })
}

 function whoWon(){ 
     let winner = 2;

    if ((gameState.get('sq1') != '') &&
        (gameState.get('sq1') == gameState.get('sq2')) && 
        (gameState.get('sq2') == gameState.get('sq3'))){
        if(gameState.get('sq1') == game.players[0].XorO){
            winner = 0;
        } else {
            winner = 1;
        }

    } else if ((gameState.get('sq4') != '') &&
               (gameState.get('sq4') == gameState.get('sq5')) && 
               (gameState.get('sq5') == gameState.get('sq6'))){
                if(gameState.get('sq4') == game.players[0].XorO){
                    winner = 0;
                } else {
                    winner = 1;
                }
    } else if ((gameState.get('sq7') != '') &&
               (gameState.get('sq7') == gameState.get('sq8')) && 
               (gameState.get('sq8') == gameState.get('sq9'))){
                if(gameState.get('sq7') == game.players[0].XorO){
                    winner = 0;
                } else {
                    winner =1;
                }
    } else if ((gameState.get('sq1') != '') &&
                (gameState.get('sq1') == gameState.get('sq4')) && 
                (gameState.get('sq4') == gameState.get('sq7'))){
                    if(gameState.get('sq1') == game.players[0].XorO){
                        winner = 0;
                    } else {
                        winner = 1;
                    }
    } else if ((gameState.get('sq2') != '') &&
                (gameState.get('sq2') == gameState.get('sq5')) && 
                (gameState.get('sq5') == gameState.get('sq8'))){
                    if(gameState.get('sq2') == game.players[0].XorO){
                        winner = 0;
                    } else {
                        winner = 1;
                    }
    } else if ((gameState.get('sq3') != '') &&
                (gameState.get('sq3') == gameState.get('sq6')) && 
                (gameState.get('sq6') == gameState.get('sq9'))){
                    if(gameState.get('sq3') == game.players[0].XorO){
                        winner = 0;
                    } else {
                        winner = 1;
                    }
    } else if ((gameState.get('sq1') != '') &&
                (gameState.get('sq1') == gameState.get('sq5')) && 
                (gameState.get('sq5') == gameState.get('sq9'))){
                    if(gameState.get('sq1') == game.players[0].XorO){
                        winner = 0;
                    } else {
                        winner = 1;
                    }
    } else if ((gameState.get('sq3') != '') &&
                (gameState.get('sq3') == gameState.get('sq5')) && 
                (gameState.get('sq5') == gameState.get('sq7'))){
                    if(gameState.get('sq3') == game.players[0].XorO){
                        winner = 0;
                    } else {
                        winner = 1;
                    }
    }

    if(winner != 2){
        alertDiv.innerHTML = `<div class="alert alert-info" role="alert"> ${game.players[winner].name} wins the game! </div>`

    }

 }

 const target = window.document.getElementsByTagName('h1')[0]

const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both ">${letter}</span>`
const colorLetter = letter => `<span style="color: hsla(${Math.random()*360}, 100%, 80%, 1);">${letter}</span>`;
const flickerAndColorText = text => 
  text
    .split('')
    .map(flickerLetter)
    .map(colorLetter)
    .join('');
const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);


neonGlory(target);
target.onclick = ({ target }) =>  neonGlory(target);