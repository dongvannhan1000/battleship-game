import AIPlayer from '../src/models/AIPlayer';
import Board from '../src/models/Board';

jest.mock('../src/models/Board');

describe('AIPlayer with Hunt and Target Strategy', () => {
  let aiPlayer;
  let board;

  beforeEach(() => {
    board = new Board(10);
    board.size = 10;
    aiPlayer = new AIPlayer('AI', board);
  });

  test('should start in hunt mode', () => {
    expect(aiPlayer.mode).toBe('hunt');
  });

  test('should switch to target mode when a ship is hit', () => {
    aiPlayer.registerHit(5, 5);
    expect(aiPlayer.mode).toBe('target');
    expect(aiPlayer.lastHit).toEqual([5, 5]);
  });

  test('should attack adjacent cells in target mode', () => {
    aiPlayer.registerHit(5, 5);
    const [row, col] = aiPlayer.generateAttack();
    expect([
      [4, 5],
      [6, 5],
      [5, 4],
      [5, 6]
    ]).toContainEqual([row, col]);
  });

  test('should return to hunt mode when all adjacent cells are attacked', () => {
    aiPlayer.registerHit(5, 5);
    expect(aiPlayer.mode).toBe('target');

    aiPlayer.registerMiss(4, 5);
    expect(aiPlayer.mode).toBe('target');

    aiPlayer.registerMiss(6, 5);
    expect(aiPlayer.mode).toBe('target');

    aiPlayer.registerMiss(5, 4);
    expect(aiPlayer.mode).toBe('target');

    aiPlayer.registerMiss(5, 6);
    expect(aiPlayer.mode).toBe('hunt');
  });

  test('should not repeat previous attacks', () => {
    const attacks = new Set();
    const totalCells = 100; // 10x10 board
    
    for (let i = 0; i < totalCells; i++) {
      const [row, col] = aiPlayer.generateAttack();
      const attackKey = `${row},${col}`;
      expect(attacks.has(attackKey)).toBe(false);
      attacks.add(attackKey);
      aiPlayer.registerMiss(row, col);
    }

    expect(attacks.size).toBe(totalCells);
  });
});