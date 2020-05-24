import { solution, pickDoll, countBomb } from '../../src/craneGame';

let board;
let moves;

describe('인형뽑기 터트려진 인형 구하기', () => {
  beforeEach(() => {
    board = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1]
    ];
    moves = [1, 5, 3, 5, 1, 2, 1, 4];
  });

  test('라인의 마지막 인형 선택', () => {
    const pickedDoll = pickDoll(1, board);
    expect(pickedDoll).toBe(4);
  });

  test('바구니에 들어있는 인형 터트리기', () => {
    const basket = [1, 2, 3, 4, 5];
    expect(countBomb(basket, 5)).toBe(2);
    expect(basket.length).toBe(4);
    expect(countBomb(basket, 2)).toBe(0);
    expect(basket.length).toBe(5);
  });

  test('터트린 인형 갯수 구하기', () => {
    const bomb = solution(board, moves);
    expect(bomb).toBe(4);
  });
});
