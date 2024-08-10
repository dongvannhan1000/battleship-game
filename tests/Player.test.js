import Player from '../src/models/Player';
import Board from '../src/models/Board';
import Ship from '../src/models/Ship';

describe('Player', () => {
  let player;
  let board;

  beforeEach(() => {
    board = new Board(10);
    player = new Player('Player 1', board);
  });

  test('should create a player with a name and board', () => {
    expect(player.name).toBe('Player 1');
    expect(player.board).toBe(board);
  });

  test('should place ships on the board', () => {
    const ship = new Ship(3);
    expect(player.placeShip(ship, 0, 0, 'horizontal')).toBe(true);
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
  });

  test('should not place ships outside the board', () => {
    const ship = new Ship(3);
    expect(player.placeShip(ship, 9, 9, 'horizontal')).toBe(false);
  });

  test('should attack enemy board', () => {
    const enemyBoard = new Board(10);
    const ship = new Ship(3);
    enemyBoard.placeShip(ship, 0, 0, 'horizontal');

    expect(player.attack(enemyBoard, 0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('should record missed attacks', () => {
    const enemyBoard = new Board(10);
    expect(player.attack(enemyBoard, 0, 0)).toBe(false);
    expect(enemyBoard.missedAttacks).toContainEqual([0, 0]);
  });

  test('should not allow attacking the same position twice', () => {
    const enemyBoard = new Board(10);
    player.attack(enemyBoard, 0, 0);
    expect(() => player.attack(enemyBoard, 0, 0)).toThrow('Position already attacked');
  });

  test('should report if all ships are sunk', () => {
    const ship = new Ship(1);
    player.placeShip(ship, 0, 0, 'horizontal');
    expect(player.hasLost()).toBe(false);
    board.receiveAttack(0, 0);
    expect(player.hasLost()).toBe(true);
  });
});