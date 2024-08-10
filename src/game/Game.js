import { Player } from './Player';
import { Ship } from './Ship';

export class Game {
  constructor() {
    this.player1 = new Player('human');
    this.player2 = new Player('computer');
    this.currentPlayer = this.player1;
    this.setupShips();
  }

  setupShips() {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    this.player1.gameBoard.placeShip(ship1, 0, 0, 'horizontal');
    this.player2.gameBoard.placeShip(ship2, 0, 0, 'horizontal');
  }

  playTurn(row, col) {
    const opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    const hit = this.currentPlayer.attack(opponent.gameBoard, row, col);
    this.switchTurn();
    return hit;
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  isGameOver() {
    return this.player1.gameBoard.allShipsSunk() || this.player2.gameBoard.allShipsSunk();
  }

  getWinner() {
    if (this.player2.gameBoard.allShipsSunk()) return this.player1;
    if (this.player1.gameBoard.allShipsSunk()) return this.player2;
    return null;
  }
}