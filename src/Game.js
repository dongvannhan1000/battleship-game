import Player from './Player';
const DOM = require('./DOM');
import Ship from './Ship';

const Game = (() => {
    let player;
    let computer;
    let currentPlayer;

    function init() {
        player = new Player('human');
        computer = new Player('computer');
        currentPlayer = player;

        // Pre-place ships for both players
        player.gameboard.placeShip(new Ship(5), [0, 0], 'horizontal');
        player.gameboard.placeShip(new Ship(4), [2, 0], 'horizontal');
        player.gameboard.placeShip(new Ship(3), [4, 0], 'horizontal');
        player.gameboard.placeShip(new Ship(3), [6, 0], 'horizontal');
        player.gameboard.placeShip(new Ship(2), [8, 0], 'horizontal');

        computer.gameboard.placeShip(new Ship(5), [0, 0], 'horizontal');
        computer.gameboard.placeShip(new Ship(4), [2, 0], 'horizontal');
        computer.gameboard.placeShip(new Ship(3), [4, 0], 'horizontal');
        computer.gameboard.placeShip(new Ship(3), [6, 0], 'horizontal');
        computer.gameboard.placeShip(new Ship(2), [8, 0], 'horizontal');

        DOM.renderBoard(player.gameboard, 'player-board', true);
        DOM.renderBoard(computer.gameboard, 'computer-board');
        addEventListeners();
    }

    function addEventListeners() {
        const computerBoardElement = document.getElementById('computer-board');
        computerBoardElement.addEventListener('click', handlePlayerAttack);
    }

    function handlePlayerAttack(event) {
        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);

        if (isNaN(x) || isNaN(y)) return;

        if (currentPlayer === player) {
            player.attack(computer.gameboard, [x, y]);
            DOM.renderBoard(computer.gameboard, 'computer-board');
            checkGameOver();
            currentPlayer = computer;
            handleComputerTurn();
        }
    }

    function handleComputerTurn() {
        if (currentPlayer === computer) {
            computer.randomAttack(player.gameboard);
            DOM.renderBoard(player.gameboard, 'player-board', true);
            checkGameOver();
            currentPlayer = player;
        }
    }

    function checkGameOver() {
        if (computer.gameboard.areAllShipsSunk()) {
            alert('Player wins!');
            resetGame();
        } else if (player.gameboard.areAllShipsSunk()) {
            alert('Computer wins!');
            resetGame();
        }
    }

    function resetGame() {
        document.location.reload();
    }

    return {
        init,
    };
})();

export default Game;
