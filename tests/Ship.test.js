import { Ship } from '../src/game/Ship';

describe('Ship', () => {
  test('should be created with the correct length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  test('should not be sunk when created', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
  });

  test('should be hit when hit() is called', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should be sunk when hit enough times', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});