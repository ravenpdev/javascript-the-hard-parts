// function copyArrayAndmultiplyBy2(array) {
//   const output = [];
//   for (let i = 0; i < array.length; i++) {
//     output.push(array[i] * 2);
//   }
//   return output;
// }

// const myArray = [1, 2, 3];
// const result = copyArrayAndmultiplyBy2(myArray);

// Global Execution Context
// Memory
//  - copyArrayAndManipulate (F)
//  - multiplyBy2 (F)
//  - result: [2, 4, 6]
// Thread execution
//  - copyArrayAndManipulate
//  - Execution Context
//    - Thread execution
//      - output.push(instruction(1 * 2))
//    - Local Memory
//      - array: [1, 2, 3]
//      - instruction: (f)
//      - output: [2, 4, 6]
// CallStack
// - instruction(3) popped out
// - instruction(2) popped out
// - instruction(1) popped out
// - copyArrayAndManipulate([1, 2, 3], instruction (F)) popped out

function copyArrayAndManipulate(array, instruction) {
  const output = [];

  for (let i = 0; i < array.length; i++) {
    output.push(instruction(array[i]));
  }

  return output;
}

// function multiplyBy2(input) {
//   return input * 2;
// }

// const multiplyBy2 = (input) => input * 2;
// const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);

// const result = copyArrayAndManipulate([1, 2, 3], (input) => input * 2);

const result = [1, 2, 3].map((input) => input * 2);

console.log(result);

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

arr1.reverse(); // [3, 2, 1]
arr1.splice(1, 1, 6); // replace i element as index 1 with 6 - [3, 6, 1]
arr1.sort(); // [1, 3, 6]

const reveresed = arr2.toReversed();
const spliced = arr2.toSpliced(1, 1, 6);
const sorted = arr2.toSorted();

console.log(arr1);
// [1, 3, 6]

console.log(arr2);
// [1, 2, 3]

const deepArr = [1, 2, [1, 2], 2];
const flattened = deepArr.flat();
// Can set depth (even 'Infinity'), defaults to 1

const last2 = flattened.findIndex((x) => x === 2);
// last 2 is at idx 4

function oddOrEven(num) {
  return num % 2 === 0 ? "even" : "odd";
}
const grouped = Object.groupBy(flattened, oddOrEven);
// -> { even: [2, 2, 2], odd: [1, 1]}
// Popular SQL statement
console.log(grouped);

function filterArray(arr, callback) {
  const output = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      output.push(arr[i]);
    }
  }

  return output;
}

const values = [1, 2, 3, 4, 5];
const filteredValues = filterArray(values, (val) => val % 2 === 0);
console.log(filteredValues);

function reduce(data, callback, initial) {
  let result = initial;
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      result = callback(result, data[i]);
    }
  }

  return result;
}

const total = reduce([1, 2, 3], (acc, val) => acc + val, 0);
console.log(total);
