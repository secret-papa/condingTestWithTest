export function removeDollThatIsEqualToNew(basket: number[]): number {
  basket.pop();
  return 2;
}

export function putDollInTheBasket(basket: number[], doll: number): number {
  basket.push(doll);
  return 0;
}

export function countBomb(basket: number[], doll: number): number {
  const lastIndexOfBasket = basket.length - 1;
  const lastDollOfBasket = basket[lastIndexOfBasket];
  return lastDollOfBasket === doll
    ? removeDollThatIsEqualToNew(basket)
    : putDollInTheBasket(basket, doll);
}

export function pickDoll(move: number, board: number[][]) {
  let doll: number;
  for (let lineNumber = 0; lineNumber < board.length; lineNumber++) {
    const selecedLintIndex = move - 1;
    if (board[lineNumber][selecedLintIndex]) {
      const [result] = board[lineNumber].splice(selecedLintIndex, 1, 0);
      if (result) {
        doll = result;
        break;
      }
    }
  }
  return doll;
}

export function solution(board: number[][], moves: number[]): number {
  const basket = [];
  let bomb = 0;

  moves.forEach((move) => {
    const doll: number = pickDoll(move, board);
    if (doll) bomb += countBomb(basket, doll);
  });
  
  return bomb;
}