class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array(size).fill().map(() => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, row, col, orientation) {
    if (this.isPlacementValid(ship, row, col, orientation)) {
      if (orientation === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          this.grid[row][col + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.grid[row + i][col] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  isPlacementValid(ship, row, col, orientation) {
    if (orientation === 'horizontal') {
      if (col + ship.length > this.size) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row][col + i] !== null) return false;
      }
    } else {
      if (row + ship.length > this.size) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row + i][col] !== null) return false;
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    if (this.grid[row][col] !== null) {
      this.grid[row][col].hit();
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

export default Board;