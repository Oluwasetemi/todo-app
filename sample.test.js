// import { describe, it, expect } from 'vitest'
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function extractOddNumbers(arr) {
  let oddNumbers = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) oddNumbers.push(arr[i]);
  }
  return oddNumbers;
}

function extractEvenNumbers() {
  return arr.filter((num) => num % 2 === 0);
}

// expecting extractEvenNumbers(arr) = [2, 4, 6, 8, 10]

// expecting extractOddNumbers(arr) = [1, 3, 5, 7, 9]
describe('extractOddNumbers', () => {
  it('should return an array of odd numbers', () => {
    expect(extractOddNumbers(arr)).toEqual([1, 3, 5, 7, 9]);
  });

  it('sample test', () => {
    expect(1 + 1).toEqual(2);
  });

});


describe('extractEvenNumbers', () => {});
it('should return an array of even numbers', () => {
  expect(extractEvenNumbers(arr)).toEqual([2, 4, 6, 8, 10]);
});

// Jest
// vitest
// mocha
// chai
// jasmine


// enzyme
// testing library