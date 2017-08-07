"use strict";
const betService = require("./bet.service");

exports.Dividend = class {
  constructor(product, selection, myYield) {
    this.product = product;
    this.selection = selection;
    this.myYield = myYield;
  }

  toString() {
    const selectionString = this.displaySelection(this.selection);
    if (selectionString && this.myYield && this.product) {
      return `${this.product}:${selectionString}:$${this.myYield}`;
    }
  }

  displaySelection(selection) {
    if (Array.isArray(selection)) {
      let displayValue = "";
      for (let i = 0; i < selection.length; i++) {
        if (i > 0) displayValue += ",";
        displayValue += selection[i];
      }
      return displayValue;
    } else return undefined;
  }
};
