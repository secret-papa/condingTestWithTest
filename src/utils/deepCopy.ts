export function deepCopyArray(arr: any[]): any[] {
  const deepCopyedArray = [];
  for (const a of arr) {
    if(Array.isArray(a)) {
      deepCopyedArray.push(deepCopyArray(a));
    } else if (a.constructor === Object) {
      deepCopyedArray.push(deepCopyObject(a));
    } else {
      deepCopyedArray.push(a);
    }
  }
  return deepCopyedArray;
};

export function deepCopyObject<T>(obj: T): T {
  const deepCopyedObject = {} as T;
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      deepCopyedObject[key] = deepCopyArray(value);
    } else if (value.constructor === Object) {
      deepCopyedObject[key] = deepCopyObject(value);
    } else {
      deepCopyedObject[key] = value;
    }
  }
  return deepCopyedObject;
}


export function deepCopy<T>(target: T[]): T[];
export function deepCopy<T>(target: T): T;
export default function deepCopy<T>(target): T[] | T {
  return Array.isArray(target) ? deepCopyArray(target) : deepCopyObject(target);
}