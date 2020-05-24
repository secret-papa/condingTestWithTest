import { deepCopy, deepCopyArray, deepCopyObject } from '../../src/utils';

type Target = {
  name?: string;
  age?: number;
  friends?: number[] | { name?: string; age?: number };
  book?: {name: string;}
};

describe('run test of deepCopyArray', () => {
  test('copy plain array', () => {
    const arr: number[] = [1, 2, 3];
    const copyedArr: number[] = deepCopyArray(arr);
    expect(copyedArr).not.toBe(arr)
    expect(copyedArr).toEqual(arr);
  });

  test('copy nested array in array', () => {
    const arr: (number | number[])[]  = [[1, 2, 3], 4, 5, 6];
    const copyedArr: (number | number[])[] = deepCopyArray(arr);
    const [nestedArr, ...restItem] = arr;
    const [copyedNestedArr, ...copyedRestItem] = copyedArr;
    expect(copyedNestedArr).not.toBe(nestedArr);
    expect(copyedNestedArr).toEqual(nestedArr);
    expect(copyedRestItem).toEqual(restItem);
  });

  test('copy nested obejct in array', () => {
    const arr: (number | Target)[] = [{ name: 'lee', age: 20 }, 1, 2, 3];
    const copyedArr = deepCopyArray(arr);
    const [nestedObject, ...restItem] = arr;
    const [copyedNestedObject, ...copyedRestItem] = copyedArr;
    expect(copyedNestedObject).not.toBe(nestedObject);
    expect(copyedNestedObject).toEqual(nestedObject);
    expect(copyedRestItem).toEqual(restItem);
  });
});

describe('run test of deepCopyObject', () => {
  test('copy plain object', () => {
    const object: Target = { name: 'lee', age: 20 };
    const copyedObject: Target = deepCopyObject(object) as Target;
    expect(copyedObject).not.toBe(object)
    expect(copyedObject).toEqual(object);
  });

  test('copy nested array in object', () => {
    const object: Target = { name: 'lee', age: 20, friends: [1, 2, 3] };
    const copyedObject: Target = deepCopyObject(object) as Target;
    expect(copyedObject.friends).not.toBe(object.friends);
    expect(copyedObject.friends).toEqual(object.friends);
    expect(copyedObject).toEqual(object);
  });

  test('copy nested object in object', () => {
    const object: Target = { name: 'lee', age: 20, friends: { name: 'kim', age: 10 } };
    const copyedObject: Target = deepCopyObject(object) as Target;
    expect(copyedObject.friends).not.toBe(object.friends);
    expect(copyedObject.friends).toEqual(object.friends);
    expect(copyedObject).toEqual(object);
  });
});

describe('deepCopy nested Array & object', () => {
  test('copy plain', () => {
    const arr = [1,2,3,4];
    const object: Target = { name: 'lee', age: 10 };
    const copyedArr = deepCopy(arr);
    const copyedObject = deepCopy(object);

    expect(copyedArr).not.toBe(arr);
    expect(copyedObject).not.toBe(object);
    expect(copyedArr).toEqual(arr);
    expect(copyedObject).toEqual(object);
  });

  test('copy nested', () => {
    const arr = [[1, 2, 3],{ name: 'lee', age: 10 }, 4, 5];
    const object: Target = {
      name: 'lee',
      age: 10,
      friends: [1, 2, 3],
      book: { name: 'smart' }
    };
    const copyedArr = deepCopy(arr);
    const copyedObject = deepCopy(object);

    const [arrInArr, objectInArray, ...restInArray] = arr;
    const [copyedArrInArr, copyedObjectInArray, ...restInCopyedArray] = copyedArr as any[];
    const { friends, book, ...restObject } = object;
    const { friends: copyedFriends, book: copyedBook, ...restCopyedObject } = copyedObject as Target;

    expect(copyedArr).not.toBe(arr);
    expect(copyedObject).not.toBe(object);

    expect(copyedArrInArr).not.toBe(arrInArr);
    expect(copyedObjectInArray).not.toBe(objectInArray);
    expect(copyedArrInArr).toEqual(arrInArr);
    expect(copyedObjectInArray).toEqual(objectInArray);

    expect(restInCopyedArray).toEqual(restInArray);
    expect(restCopyedObject).toEqual(restObject);
  });
});

