import { Game } from './Game';
import { Ship } from './Ship';

export class GameUI {
    constructor() {
        this.game = new Game();
        this.playerGrid = document.querySelector('#player-board .grid');
        this.computerGrid = document.querySelector('#computer-board .grid');
        this.messageElement = document.getElementById('message');
        this.ships = [];
        this.currentShipIndex = 0;
        this.isPlacingShips = true;
    }

    init() {
      this.createShips();
      this.renderBoards();
      this.addEventListeners();
      this.updateMessage("Place your ships. Click to place, right-click to rotate.");
    }

    createShips() {
      const totalShipArea = 20; // Tổng diện tích tàu
      let remainingArea = totalShipArea;
      while (remainingArea > 0) {
          const size = Math.min(Math.floor(Math.random() * 4) + 1, remainingArea);
          this.ships.push(new Ship(size));
          remainingArea -= size;
      }
    }

    renderBoards() {
        this.renderGrid(this.playerGrid, this.game.player1.gameBoard, true);
        this.renderGrid(this.computerGrid, this.game.player2.gameBoard, false);
    }

    renderGrid(gridElement, gameBoard, isPlayer) {
        gridElement.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                if (isPlayer && gameBoard.board[i][j]) {
                    cell.classList.add('ship');
                }
                gridElement.appendChild(cell);
            }
        }
    }

    addEventListeners() {
      this.playerGrid.addEventListener('click', (e) => this.handlePlayerGridClick(e));
      this.playerGrid.addEventListener('contextmenu', (e) => this.handlePlayerGridRightClick(e));
      this.computerGrid.addEventListener('click', (e) => this.handleComputerGridClick(e));
    }

    handlePlayerGridClick(e) {
      if (!this.isPlacingShips) return;
      const cell = e.target;
      if (!cell.classList.contains('cell')) return;

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const ship = this.ships[this.currentShipIndex];
      const direction = ship.direction || 'horizontal';

      if (this.game.player1.gameboard.placeShip(ship, row, col, direction)) {
          this.renderGrid(this.playerGrid, this.game.player1.gameboard, true);
          this.currentShipIndex++;
          if (this.currentShipIndex >= this.ships.length) {
              this.finishPlacingShips();
          } else {
              this.updateMessage(`Place your ${this.ships[this.currentShipIndex].length}-unit ship.`);
          }
      }
    }

    handlePlayerGridRightClick(e) {
        e.preventDefault();
        if (!this.isPlacingShips) return;
        const ship = this.ships[this.currentShipIndex];
        ship.direction = ship.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.updateMessage(`Placing ${ship.length}-unit ship ${ship.direction}ly. Click to place.`);
    }

    handleComputerGridClick(e) {
        if (this.isPlacingShips) return;
        if (e.target.classList.contains('cell') && !e.target.classList.contains('hit') && !e.target.classList.contains('miss')) {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            this.makeMove(row, col);
        }
    }

    finishPlacingShips() {
        this.isPlacingShips = false;
        this.placeComputerShips();
        this.updateMessage("All ships placed. Start attacking the computer's board!");
    }

    placeComputerShips() {
        this.ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                placed = this.game.player2.gameboard.placeShip(ship, row, col, direction);
            }
        });
    }

    makeMove(row, col) {
        const hit = this.game.playTurn(row, col);
        this.updateCell(this.computerGrid, row, col, hit);
        
        if (this.game.isGameOver()) {
            this.endGame();
        } else {
            this.computerMove();
        }
    }

    computerMove() {
        const [row, col] = this.getRandomMove();
        const hit = this.game.playTurn(row, col);
        this.updateCell(this.playerGrid, row, col, hit);

        if (this.game.isGameOver()) {
            this.endGame();
        }
    }

    updateCell(grid, row, col, hit) {
        const cell = grid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add(hit ? 'hit' : 'miss');
    }

    getRandomMove() {
        let row, col;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (this.playerGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.contains('hit') || 
                 this.playerGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.contains('miss'));
        return [row, col];
    }

    updateShipCount() {
      const playerShipsLeft = this.game.player1.gameboard.ships.filter(ship => !ship.isSunk()).length;
      const computerShipsLeft = this.game.player2.gameboard.ships.filter(ship => !ship.isSunk()).length;
      document.getElementById('player-ships').textContent = `Your ships: ${playerShipsLeft}`;
      document.getElementById('computer-ships').textContent = `Computer's ships: ${computerShipsLeft}`;
    }

    endGame() {
        const winner = this.game.getWinner();
        this.messageElement.textContent = winner === this.game.player1 ? "You win!" : "Computer wins!";
        this.computerGrid.removeEventListener('click', this.makeMove);
    }
}