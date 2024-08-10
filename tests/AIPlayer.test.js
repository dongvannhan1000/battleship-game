import AIPlayer from '../src/models/AIPlayer';
import Board from '../src/models/Board';

jest.mock('../src/models/Board');

describe('AIPlayer', () => {
  let aiPlayer;
  let board;

  beforeEach(() => {
    board = new Board(10);
    board.size = 10;
    aiPlayer = new AIPlayer('AI', board);
  });

  test('should create an AI player with a name and board', () => {
    expect(aiPlayer.name).toBe('AI');
    expect(aiPlayer.board).toBe(board);
  });

  test('should generate a random attack within board boundaries', () => {
    const [row, col] = aiPlayer.generateRandomAttack();
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });

  test('should not repeat previous attacks', () => {
    const attacks = new Set();
    const totalCells = 100; // 10x10 board
    
    for (let i = 0; i < totalCells; i++) {
      const [row, col] = aiPlayer.generateRandomAttack();
      const attackKey = `${row},${col}`;
      expect(attacks.has(attackKey)).toBe(false);
      attacks.add(attackKey);
    }

    expect(attacks.size).toBe(totalCells);
  });

  test('should throw an error when all positions have been attacked', () => {
    const totalCells = 100; // 10x10 board
    for (let i = 0; i < totalCells; i++) {
      aiPlayer.generateRandomAttack();
    }

    expect(() => aiPlayer.generateRandomAttack()).toThrow('All positions have been attacked');
  });
});