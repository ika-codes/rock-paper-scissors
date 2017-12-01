//Initiating new game

var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

//Assigning symbol to a player

var pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors'),
	pickLizard = document.getElementById('js-playerPick_lizard'),
	pickSpock = document.getElementById('js-playerPick_spock');

pickRock.addEventListener('click', function() { playerPick('rock'); });
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });
pickLizard.addEventListener('click', function() { playerPick('lizard'); });
pickSpock.addEventListener('click', function() { playerPick('Spock'); });

//Initial values

var gameState = 'notStarted',  //started // ended
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

 //Assigning game elements

var newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement');

//Game state change

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
		break;
		case 'ended':
			newGameBtn.innerText = 'Play again!';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
  	}
}

setGameElements();

//New game

var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'Player ONE');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

//Making a choice

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//Game logic

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
		(computerPick == 'rock' &&  (playerPick == 'scissors' || playerPick == 'lizard')) ||
		(computerPick == 'scissors' &&  (playerPick == 'paper' || playerPick == 'lizard')) ||
		(computerPick == 'paper' &&  (playerPick == 'rock' || playerPick == 'Spock')) ||
		(computerPick == 'lizard' &&  (playerPick == 'Spock' || playerPick == 'paper')) ||
		(computerPick == 'Spock' &&  (playerPick == 'scissors' || playerPick == 'rock'))) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

