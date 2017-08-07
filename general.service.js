"use strict";

exports.checkNumbersAndUniqueInArray = array => {
  if (
    !this.checkIfArrayIsUnique(array) ||
    array.length === 0 ||
    !this.checkIfArrayHasOnlyNumbers(array)
  )
    return false;
  else return true;
};

exports.checkIfArrayHasOnlyNumbers = array => {
  if (!Array.isArray(array) || array.length === 0) return false;  
  let onlyNumber = true;
  array.every(number => {
    if (isNaN(number) || typeof(number) === 'string') {
      onlyNumber = false;
      return false;
    } else return true;
  });
  return onlyNumber;
};

exports.checkIfArrayIsUnique = array => {
  if (!Array.isArray(array)) return false;
  return array.length === new Set(array).size;
};
