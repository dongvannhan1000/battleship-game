class Gameboard {
  constructor() {
      this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
      this.missedShots = [];
  }

  placeShip(ship, [x, y], direction) {
      if (direction === 'horizontal') {
          for (let i = 0; i < ship.length; i++) {
              this.grid[x][y + i] = ship;
          }
      } else if (direction === 'vertical') {
          for (let i = 0; i < ship.length; i++) {
              this.grid[x + i][y] = ship;
          }
      }
  }

  receiveAttack([x, y]) {
      const ship = this.grid[x][y];
      if (ship) {
          ship.hit();
      } else {
          this.missedShots.push([x, y]);
      }
  }

  getMissedShots() {
      return this.missedShots;
  }

  getShipAt([x, y]) {
      return this.grid[x][y];
  }

  areAllShipsSunk() {
      return this.grid.flat().filter(ship => ship).every(ship => ship.isSunk());
  }
}

export default Gameboard