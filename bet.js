"use strict";
const ProductType = require("./enums").ProductType;
const betService = require("./bet.service");

exports.Bet = class {
  constructor(product, selection, stake) {
    this.product = product;
    this.selection = selection;
    this.stake = stake;
  }

  isBetConsistant() {
    return betService.isBetConsistant(this.product, this.selection, this.stake);
  }
};
