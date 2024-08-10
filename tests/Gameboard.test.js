import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";

describe('Gameboard', () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should place ships at specific coordinates', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship, [0, 0], 'horizontal');

        // Ensure the ship occupies the correct coordinates
        expect(gameboard.getShipAt([0, 0])).toBe(ship);
        expect(gameboard.getShipAt([0, 1])).toBe(ship);
        expect(gameboard.getShipAt([0, 2])).toBe(ship);
    });

    test('should register a hit on the correct ship', () => {
        const ship = new Ship(2);
        gameboard.placeShip(ship, [1, 1], 'vertical');
        gameboard.receiveAttack([1, 1]);

        expect(ship.hits).toBe(1); // The ship should register a hit
        expect(gameboard.getMissedShots()).toEqual([]); // No misses yet
    });

    test('should register a miss if no ship is present at the attacked coordinates', () => {
        gameboard.receiveAttack([5, 5]);
        expect(gameboard.getMissedShots()).toEqual([[5, 5]]);
    });

    test('should report when all ships have been sunk', () => {
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);
        gameboard.placeShip(ship1, [0, 0], 'horizontal');
        gameboard.placeShip(ship2, [2, 2], 'vertical');

        gameboard.receiveAttack([0, 0]); // Sinks ship1
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([3, 2]); // Sinks ship2

        expect(gameboard.areAllShipsSunk()).toBe(true);
    });
});
