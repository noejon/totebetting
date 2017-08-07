"use strict";
const ProductType = require("./enums").ProductType;
const Dividend = require("./dividend").Dividend;

exports.computeOneHorseDividend = (horse, pot, pool, product) => {
  if (horse && pot && Array.isArray(pool) && product) {
    const addedWinningStakes = pool.reduce(
      (sum, bet) => {
        if (
          Array.isArray(bet.selection) &&
          bet.selection.length === 1 &&
          bet.selection[0] === horse
        ) {
          return { stake: sum.stake + bet.stake };
        } else {
          return { stake: sum.stake };
        }
      },
      { stake: 0 }
    ).stake;
    if (addedWinningStakes === 0)
      return new Dividend(ProductType.properties[product].name, [horse], 0);
    else
      return new Dividend(
        ProductType.properties[product].name,
        [horse],
        (pot / addedWinningStakes).toFixed(2)
      );
  } else return undefined;
};

exports.computePot = (bets, product) => {
  if (Array.isArray(bets) && bets.length > 0 && product) {
    let pot = bets.reduce((sum, bet) => {
      if (bet.product === product) {
        return { stake: sum.stake + bet.stake };
      } else {
        return { stake: sum.stake };
      }
    });
    return pot.stake * ProductType.properties[product].sharedPot;
  } else return 0;
};
