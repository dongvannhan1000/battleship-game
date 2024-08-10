import { GameBoard } from '../src/game/Gameboard';
import { Ship } from '../src/game/Ship';

describe('GameBoard', () => {
  test('should place ship at specific coordinates', () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);
    expect(gameBoard.placeShip(ship, 0, 0, 'horizontal')).toBe(true);
  });

  test('should not place ship if it goes off the board', () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);
    expect(gameBoard.placeShip(ship, 0, 8, 'horizontal')).toBe(false);
  });

  test('should receive attack and hit ship', () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3);
    gameBoard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameBoard.receiveAttack(0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('should receive attack and miss', () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.receiveAttack(0, 0)).toBe(false);
  });

  test('should report if all ships are sunk', () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(1);
    gameBoard.placeShip(ship1, 0, 0, 'horizontal');
    gameBoard.placeShip(ship2, 1, 0, 'horizontal');
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});