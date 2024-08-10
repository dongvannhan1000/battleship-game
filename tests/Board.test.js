import Board from '../src/models/Board';
import Ship from '../src/models/Ship';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board(10); // Tạo một bảng 10x10
  });

  test('should create a board with the correct size', () => {
    expect(board.size).toBe(10);
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
  });

  test('should place a ship horizontally', () => {
    const ship = new Ship(3);
    expect(board.placeShip(ship, 0, 0, 'horizontal')).toBe(true);
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
  });

  test('should place a ship vertically', () => {
    const ship = new Ship(3);
    expect(board.placeShip(ship, 0, 0, 'vertical')).toBe(true);
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[1][0]).toBe(ship);
    expect(board.grid[2][0]).toBe(ship);
  });

  test('should not place a ship outside the board', () => {
    const ship = new Ship(3);
    expect(board.placeShip(ship, 9, 9, 'horizontal')).toBe(false);
  });

  test('should not place a ship overlapping another ship', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    board.placeShip(ship1, 0, 0, 'horizontal');
    expect(board.placeShip(ship2, 0, 1, 'vertical')).toBe(false);
  });

  test('should receive attack and record hit', () => {
    const ship = new Ship(3);
    board.placeShip(ship, 0, 0, 'horizontal');
    expect(board.receiveAttack(0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('should receive attack and record miss', () => {
    expect(board.receiveAttack(0, 0)).toBe(false);
    expect(board.missedAttacks).toContainEqual([0, 0]);
  });

  test('should report if all ships are sunk', () => {
    const ship = new Ship(1);
    board.placeShip(ship, 0, 0, 'horizontal');
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });
});