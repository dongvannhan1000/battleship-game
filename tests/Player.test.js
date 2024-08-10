import { Player } from '../src/game/Player';
import { GameBoard } from '../src/game/Gameboard';
import { Ship } from '../src/game/Ship';

describe('Player', () => {
  test('should create a player with a game board', () => {
    const player = new Player('human');
    expect(player.type).toBe('human');
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });

  test('human player should attack enemy gameboard', () => {
    const player = new Player('human');
    const enemyGameBoard = new GameBoard();
    const ship = new Ship(3);
    enemyGameBoard.placeShip(ship, 0, 0, 'horizontal');
    
    expect(player.attack(enemyGameBoard, 0, 0)).toBe(true);
    expect(player.attack(enemyGameBoard, 1, 0)).toBe(false);
  });

  test('computer player should make random legal moves', () => {
    const player = new Player('computer');
    const enemyGameBoard = new GameBoard();
    
    // Giả lập 100 lượt đánh để đảm bảo tính ngẫu nhiên
    for (let i = 0; i < 100; i++) {
      const result = player.attack(enemyGameBoard);
      expect(typeof result).toBe('boolean');
    }

    // Kiểm tra xem có đúng 100 lượt đánh không trùng lặp
    expect(enemyGameBoard.missedAttacks.length + 
           enemyGameBoard.board.flat().filter(cell => cell instanceof Ship && cell.hits > 0).length
    ).toBe(100);
  });
});