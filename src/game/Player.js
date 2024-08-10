import { GameBoard } from './Gameboard';
import { Ship } from './Ship';

export class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
  }

  attack(enemyGameBoard, row, col) {
    if (this.type === 'human') {
      return enemyGameBoard.receiveAttack(row, col);
    } else if (this.type === 'computer') {
      let randomRow, randomCol;
      do {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
      } while (enemyGameBoard.missedAttacks.some(([r, c]) => r === randomRow && c === randomCol) ||
               (enemyGameBoard.board[randomRow][randomCol] instanceof Ship && 
                enemyGameBoard.board[randomRow][randomCol].hits > 0));
      
      return enemyGameBoard.receiveAttack(randomRow, randomCol);
    }
  }
}

export class ComputerPlayer extends Player {
  constructor() {
      super('computer');
      this.lastHit = null;
      this.potentialTargets = [];
  }

  attack(enemyGameBoard) {
      let row, col;
      if (this.lastHit) {
          [row, col] = this.getSmartTarget(enemyGameBoard);
      } else {
          [row, col] = this.getRandomTarget(enemyGameBoard);
      }

      const hit = enemyGameBoard.receiveAttack(row, col);
      if (hit) {
          this.lastHit = [row, col];
          this.addPotentialTargets(row, col);
      } else if (this.potentialTargets.length === 0) {
          this.lastHit = null;
      }

      return [row, col, hit];
  }

  getSmartTarget(enemyGameBoard) {
      while (this.potentialTargets.length > 0) {
          const [row, col] = this.potentialTargets.pop();
          if (!enemyGameBoard.board[row][col].isHit) {
              return [row, col];
          }
      }
      return this.getRandomTarget(enemyGameBoard);
  }

  getRandomTarget(enemyGameBoard) {
      let row, col;
      do {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
      } while (enemyGameBoard.board[row][col].isHit);
      return [row, col];
  }

  addPotentialTargets(row, col) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
              this.potentialTargets.push([newRow, newCol]);
          }
      }
  }
}