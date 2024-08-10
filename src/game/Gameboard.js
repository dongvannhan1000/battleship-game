import { Ship } from "./Ship";

export class GameBoard {
  constructor() {
    this.board = Array(10).fill().map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, row, col, direction) {
    if (direction === 'horizontal') {
      if (col + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i] !== null) return false;
        this.board[row][col + i] = ship;
      }
    } else {
      if (row + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col] !== null) return false;
        this.board[row + i][col] = ship;
      }
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit();
      return true;
    } else {
      this.missedAttacks.push([row, col]);
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}