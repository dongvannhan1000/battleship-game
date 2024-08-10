import Ship from '../src/models/Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3); // Tạo một tàu có độ dài 3
  });

  test('should create a ship with the correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('should not be sunk when created', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('should register hits', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should be sunk when hit enough times', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});