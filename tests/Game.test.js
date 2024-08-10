import Game from '../src/Game';
import Player from '../src/models/Player';
import Board from '../src/models/Board';
import Ship from '../src/models/Ship';
import AIPlayer from '../src/models/AIPlayer';

jest.mock('../src/models/Player');
jest.mock('../src/models/Board');
jest.mock('../src/models/Ship');
jest.mock('../src/models/AIPlayer');

describe('Game', () => {
  let game;
  let player1;
  let player2;
  let aiPlayer;

  beforeEach(() => {
    player1 = new Player('Player 1', new Board(10));
    player2 = new Player('Player 2', new Board(10));
    aiPlayer = new AIPlayer('AI', new Board(10));
    player1.board = { size: 10 };
    player2.board = { size: 10 };
    aiPlayer.board = { size: 10 };
  });

  test('should initialize game with two players', () => {
    game = new Game(player1, player2);
    expect(game.player1).toBe(player1);
    expect(game.player2).toBe(player2);
    expect(game.currentPlayer).toBe(player1);
  });

  test('should initialize game with player and AI', () => {
    game = new Game(player1, aiPlayer);
    expect(game.player1).toBe(player1);
    expect(game.player2).toBe(aiPlayer);
    expect(game.currentPlayer).toBe(player1);
  });

  test('should switch turns after attack for two players', () => {
    game = new Game(player1, player2);
    game.start();
    player1.attack = jest.fn().mockReturnValue(true);
    game.playTurn(0, 0);
    expect(game.currentPlayer).toBe(player2);
  });

  test('should allow AI player to make a move', () => {
    game = new Game(player1, aiPlayer);
    game.start();
    aiPlayer.attack = jest.fn().mockReturnValue(true);
    game.currentPlayer = aiPlayer;
    const hit = game.playTurn();
    expect(hit).toBe(true);
    expect(aiPlayer.attack).toHaveBeenCalledWith(player1.board);
  });

  test('should handle human player move separately', () => {
    game = new Game(player1, aiPlayer);
    game.start();
    player1.attack = jest.fn().mockReturnValue(true);
    const hit = game.playTurn(0, 0);
    expect(hit).toBe(true);
    expect(player1.attack).toHaveBeenCalledWith(aiPlayer.board, 0, 0);
  });

  test('should not allow placing ships after game starts', () => {
    game = new Game(player1, player2);
    game.start();
    const ship = new Ship(3);
    expect(() => game.placeShip(player1, ship, 0, 0, 'horizontal')).toThrow('Cannot place ships after game has started');
  });

  test('should not allow turns before game starts', () => {
    game = new Game(player1, player2);
    expect(() => game.playTurn(0, 0)).toThrow('Game has not started yet');
  });


  test('should not allow player to attack own board', () => {
    game = new Game(player1, player2); 
    game.start();
    const result = game.isValidAttack(player1, player1, 0, 0);
    expect(result).toBe(false);
  });

  test('should allow player to attack opponent board', () => {
    game = new Game(player1, player2);
    game.start();
    const result = game.isValidAttack(player1, player2, 0, 0);
    expect(result).toBe(true);
  });

  test('should not allow attacks outside the board', () => {
    game = new Game(player1, player2);
    game.start();
    expect(game.isValidAttack(player1, player2, -1, 0)).toBe(false);
    expect(game.isValidAttack(player1, player2, 0, -1)).toBe(false);
    expect(game.isValidAttack(player1, player2, 10, 0)).toBe(false);
    expect(game.isValidAttack(player1, player2, 0, 10)).toBe(false);
  });

  test('should end game when a player loses', () => {
    game = new Game(player1, player2);
    game.start();
    player2.hasLost = jest.fn().mockReturnValue(true);
    player1.attack = jest.fn().mockReturnValue(true);
    game.playTurn(0, 0);
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinner()).toBe(player1);
  });

  test('should place ships for both players before game starts', () => {
    game = new Game(player1, player2);
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);
    game.placeShip(player1, ship1, 0, 0, 'horizontal');
    game.placeShip(player2, ship2, 1, 1, 'vertical');
    expect(player1.placeShip).toHaveBeenCalledWith(ship1, 0, 0, 'horizontal');
    expect(player2.placeShip).toHaveBeenCalledWith(ship2, 1, 1, 'vertical');
  });

  test('should not allow placing ships after game starts', () => {
    game = new Game(player1, player2);
    game.start();
    const ship = new Ship(3);
    expect(() => game.placeShip(player1, ship, 0, 0, 'horizontal')).toThrow('Cannot place ships after game has started');
  });

  test('should not allow turns before game starts', () => {
    game = new Game(player1, player2);
    expect(() => game.playTurn(0, 0)).toThrow('Game has not started yet');
  });

  test('should allow turns after game starts', () => {
    game = new Game(player1, player2);
    game.start();
    player1.attack = jest.fn();
    expect(() => game.playTurn(0, 0)).not.toThrow();
  });
});