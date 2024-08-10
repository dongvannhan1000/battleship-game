class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.gameStarted = false;
  }

  start() {
    this.gameStarted = true;
  }

  placeShip(player, ship, row, col, orientation) {
    if (this.gameStarted) {
      throw new Error('Cannot place ships after game has started');
    }
    return player.placeShip(ship, row, col, orientation);
  }

  playTurn(row, col) {
    if (!this.gameStarted) {
      throw new Error('Game has not started yet');
    }

    const attackingPlayer = this.currentPlayer;
    const defendingPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;

    let hit;
    if ('generateRandomAttack' in attackingPlayer) {
      // AI player
      hit = attackingPlayer.attack(defendingPlayer.board);
    } else {
      // Human player
      hit = attackingPlayer.attack(defendingPlayer.board, row, col);
    }
    this.switchTurn();

    return hit;
  }

  isValidAttack(attackingPlayer, defendingPlayer, row, col) {
    if (!defendingPlayer || !defendingPlayer.board) {
      return false;
    }
    const boardSize = defendingPlayer.board.size || 10; // Assuming default size of 10 if not specified
    return attackingPlayer !== defendingPlayer && 
           row >= 0 && row < boardSize &&
           col >= 0 && col < boardSize;
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  isGameOver() {
    return this.player1.hasLost() || this.player2.hasLost();
  }

  getWinner() {
    if (this.player1.hasLost()) return this.player2;
    if (this.player2.hasLost()) return this.player1;
    return null;
  }
}

export default Game;