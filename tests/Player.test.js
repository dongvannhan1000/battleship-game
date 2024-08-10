import Player from "../src/Player";
import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

describe('Player', () => {
    let player;
    let opponentGameboard;

    beforeEach(() => {
        player = new Player('human');
        opponentGameboard = new Gameboard();
    });

    test('should initialize with its own gameboard', () => {
        expect(player.gameboard).toBeDefined();
    });

    test('should be able to attack an opponent\'s gameboard', () => {
        opponentGameboard.placeShip(new Ship(1), [0, 0], 'horizontal');
        player.attack(opponentGameboard, [0, 0]);

        expect(opponentGameboard.getShipAt([0, 0]).hits).toBe(1);
    });

    test('computer player should make a random attack', () => {
      const computerPlayer = new Player('computer');
      computerPlayer.randomAttack(opponentGameboard);
  
      console.log('Missed shots:', opponentGameboard.getMissedShots());
      
      let totalHits = 0;
      for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
              const ship = opponentGameboard.getShipAt([i, j]);
              if (ship) {
                  console.log(`Ship at [${i}, ${j}] hits:`, ship.hits);
                  totalHits += ship.hits;
              }
          }
      }
  
      console.log('Total hits:', totalHits);
  
      expect(opponentGameboard.getMissedShots().length + totalHits).toBe(1);
    });

    test('computer player should not attack the same coordinates twice', () => {
        const computerPlayer = new Player('computer');
        const attackSpy = jest.spyOn(computerPlayer, 'attack');

        for (let i = 0; i < 100; i++) {
            computerPlayer.randomAttack(opponentGameboard);
        }

        // Ensures that each coordinate is attacked only once
        const attacks = attackSpy.mock.calls.map(call => call[1]);
        const uniqueAttacks = new Set(attacks.map(([x, y]) => `${x},${y}`));
        expect(uniqueAttacks.size).toBe(attacks.length);
    });
});
