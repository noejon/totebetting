"use strict";
const ProductType  = require("./enums").ProductType;
const generalService = require("./general.service");

exports.isBetConsistant = (product, selection, stake) => {
  if (
    !product ||
    !ProductType.isValue(product) ||
    !selection ||
    !Array.isArray(selection) ||
    !stake ||
    isNaN(stake)
  ) {
    return false;
  } else {
    switch (product) {
      case ProductType.W:
      case ProductType.P:
        return this.checkSelectionBet(selection, 1);
      case ProductType.E:
        return this.checkSelectionBet(selection, 2);
      default:
        return false;
    }
  }
  return true;
};

exports.checkSelectionBet = (selection, expectedNumber) => {
  if (
    generalService.checkNumbersAndUniqueInArray(selection) &&
    expectedNumber &&
    !isNaN(expectedNumber)
  ) {
    if (selection.length === expectedNumber) return true;
    else return false;
  } else return false;
};
