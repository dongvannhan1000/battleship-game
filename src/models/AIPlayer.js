import Player from './Player';

class AIPlayer extends Player {
  constructor(name, board) {
    super(name, board);
    this.attackedPositions = new Set();
  }

  generateRandomAttack() {
    if (this.attackedPositions.size === this.board.size * this.board.size) {
      throw new Error('All positions have been attacked');
    }

    let row, col;
    do {
      row = Math.floor(Math.random() * this.board.size);
      col = Math.floor(Math.random() * this.board.size);
    } while (this.attackedPositions.has(`${row},${col}`));

    this.attackedPositions.add(`${row},${col}`);
    return [row, col];
  }

  attack(enemyBoard) {
    const [row, col] = this.generateRandomAttack();
    return super.attack(enemyBoard, row, col);
  }
}

export default AIPlayer;