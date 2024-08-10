class Player {
  constructor(name, board) {
    this.name = name;
    this.board = board;
    this.attackedPositions = new Set();
  }

  placeShip(ship, row, col, orientation) {
    return this.board.placeShip(ship, row, col, orientation);
  }

  attack(enemyBoard, row, col) {
    const positionKey = `${row},${col}`;
    if (this.attackedPositions.has(positionKey)) {
      throw new Error('Position already attacked');
    }

    this.attackedPositions.add(positionKey);
    return enemyBoard.receiveAttack(row, col);
  }

  hasLost() {
    return this.board.allShipsSunk();
  }
}

export default Player;