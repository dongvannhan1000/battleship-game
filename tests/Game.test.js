import { Game } from '../src/game/Game';
import { Player } from '../src/game/Player';
import { Ship } from '../src/game/Ship';

describe('Game', () => {
  test('should initialize game with two players', () => {
    const game = new Game();
    expect(game.player1).toBeInstanceOf(Player);
    expect(game.player2).toBeInstanceOf(Player);
    expect(game.currentPlayer).toBe(game.player1);
  });

  test('should allow player to make a move', () => {
    const game = new Game();
    
    expect(game.playTurn(0, 0)).toBe(true);
    expect(game.currentPlayer).toBe(game.player2);
  });

  test('should end game when all ships are sunk', () => {
    const game = new Game();
    
    expect(game.isGameOver()).toBe(false);
    game.playTurn(0, 0);
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinner()).toBe(game.player1);
  });
});