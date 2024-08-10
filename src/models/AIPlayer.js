import Player from './Player';

class AIPlayer extends Player {
  constructor(name, board) {
    super(name, board);
    this.attackedPositions = new Set();
    this.mode = 'hunt';
    this.lastHit = null;
    this.potentialTargets = [];
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

  generateAttack() {
    if (this.mode === 'target' && this.potentialTargets.length > 0) {
      return this.generateTargetModeAttack();
    } else {
      return this.generateHuntModeAttack();
    }
  }

  generateHuntModeAttack() {
    let row, col;
    do {
      row = Math.floor(Math.random() * this.board.size);
      col = Math.floor(Math.random() * this.board.size);
    } while (this.attackedPositions.has(`${row},${col}`));

    this.attackedPositions.add(`${row},${col}`);
    return [row, col];
  }

  generateTargetModeAttack() {
    const [row, col] = this.potentialTargets.pop();
    this.attackedPositions.add(`${row},${col}`);
    return [row, col];
  }

  registerHit(row, col) {
    this.mode = 'target';
    this.lastHit = [row, col];
    this.updatePotentialTargets(row, col);
  }

  registerMiss(row, col) {
    this.potentialTargets = this.potentialTargets.filter(
      ([r, c]) => r !== row || c !== col
    );

    if (this.potentialTargets.length === 0) {
      this.mode = 'hunt';
      this.lastHit = null;
    }
  }

  updatePotentialTargets(row, col) {
    const adjacent = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ];

    this.potentialTargets = adjacent.filter(([r, c]) => 
      r >= 0 && r < this.board.size && 
      c >= 0 && c < this.board.size && 
      !this.attackedPositions.has(`${r},${c}`)
    );
  }

  attack(enemyBoard) {
    const [row, col] = this.generateAttack();
    const hit = enemyBoard.receiveAttack(row, col);
    if (hit) {
      this.registerHit(row, col);
    } else {
      this.registerMiss(row, col);
    }
    return hit;
  }
}

export default AIPlayer;