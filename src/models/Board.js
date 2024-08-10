class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array(size).fill().map(() => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, row, col, orientation) {
    if (this.isPlacementValid(ship, row, col, orientation)) {
      this.placeShipOnGrid(ship, row, col, orientation);
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  isPlacementValid(ship, row, col, orientation) {
    return orientation === 'horizontal'
      ? this.isHorizontalPlacementValid(ship, row, col)
      : this.isVerticalPlacementValid(ship, row, col);
  }

  isHorizontalPlacementValid(ship, row, col) {
    if (col + ship.length > this.size) return false;
    return this.isAreaClear(row, col, ship.length, 'horizontal');
  }

  isVerticalPlacementValid(ship, row, col) {
    if (row + ship.length > this.size) return false;
    return this.isAreaClear(row, col, ship.length, 'vertical');
  }

  isAreaClear(row, col, length, orientation) {
    for (let i = 0; i < length; i++) {
      const cellRow = orientation === 'horizontal' ? row : row + i;
      const cellCol = orientation === 'horizontal' ? col + i : col;
      if (this.grid[cellRow][cellCol] !== null) return false;
    }
    return true;
  }

  placeShipOnGrid(ship, row, col, orientation) {
    for (let i = 0; i < ship.length; i++) {
      const cellRow = orientation === 'horizontal' ? row : row + i;
      const cellCol = orientation === 'horizontal' ? col + i : col;
      this.grid[cellRow][cellCol] = ship;
    }
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