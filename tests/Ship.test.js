import Ship from "../src/Ship";

describe('Ship', () => {
    test('should initialize with a given length and 0 hits', () => {
        const ship = new Ship(4); // Ship with length 4
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
        expect(ship.isSunk()).toBe(false); // Initially, ship should not be sunk
    });

    test('should register a hit', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
        expect(ship.isSunk()).toBe(false); // Not sunk after 1 hit
    });

    test('should be sunk when the number of hits equals its length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true); // Sunk after 2 hits
    });
});
