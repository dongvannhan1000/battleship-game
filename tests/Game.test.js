import Game from '../src/Game';
import Player from '../src/models/Player';
import Board from '../src/models/Board';
import Ship from '../src/models/Ship';

jest.mock('../src/models/Player');
jest.mock('../src/models/Board');
jest.mock('../src/models/Ship');

describe('Game', () => {
  let game;
  let player1;
  let player2;

  beforeEach(() => {
    player1 = new Player('Player 1', new Board(10));
    player2 = new Player('Player 2', new Board(10));
    game = new Game(player1, player2);
  });

  test('should initialize game with two players', () => {
    expect(game.player1).toBe(player1);
    expect(game.player2).toBe(player2);
    expect(game.currentPlayer).toBe(player1);
  });

  test('should switch turns after attack', () => {
    game.playTurn(0, 0);
    expect(game.currentPlayer).toBe(player2);
  });

  test('should not allow player to attack own board', () => {
    expect(() => game.playTurn(0, 0, player1.board)).toThrow('Cannot attack your own board');
  });

  test('should end game when a player loses', () => {
    player2.hasLost.mockReturnValue(true);
    game.playTurn(0, 0);
    expect(game.isGameOver()).toBe(true);
    expect(game.getWinner()).toBe(player1);
  });

  test('should place ships for both players', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);
    game.placeShip(player1, ship1, 0, 0, 'horizontal');
    game.placeShip(player2, ship2, 1, 1, 'vertical');
    expect(player1.placeShip).toHaveBeenCalledWith(ship1, 0, 0, 'horizontal');
    expect(player2.placeShip).toHaveBeenCalledWith(ship2, 1, 1, 'vertical');
  });

  test('should not allow placing ships after game starts', () => {
    game.start();
    const ship = new Ship(3);
    expect(() => game.placeShip(player1, ship, 0, 0, 'horizontal')).toThrow('Cannot place ships after game has started');
  });

  test('should not allow turns before game starts', () => {
    expect(() => game.playTurn(0, 0)).toThrow('Game has not started yet');
  });
});