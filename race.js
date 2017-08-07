"use strict";
const ProductType = require("./enums").ProductType;
const Bet = require("./bet").Bet;
const Dividend = require("./dividend").Dividend;
const generalService = require("./general.service");
const raceService = require("./race.service");

exports.Race = class {
  constructor() {
    this.winPool = [];
    this.placePool = [];
    this.exactaPool = [];
    this.result = [];
  }

  placeBet(product, selection, stake) {
    var bet = new Bet(product, selection, stake);
    if (bet.isBetConsistant()) {
      switch (bet.product) {
        case ProductType.W:
          this.addBet(bet, this.winPool);
          break;
        case ProductType.P:
          this.addBet(bet, this.placePool);
          break;
        case ProductType.E:
          this.addBet(bet, this.exactaPool);
          break;
        default:
          break;
      }
    }
  }

  isPool(pool) {
    if (
      pool &&
      Array.isArray(pool) &&
      (pool === this.winPool ||
        pool === this.placePool ||
        pool === this.exactaPool)
    )
      return true;
    else return false;
  }

  addBet(bet, pool) {
    if (bet instanceof Bet && this.isPool(pool) && bet.isBetConsistant()) {
      pool.push(bet);
    }
  }

  setResult(arrayResult) {
    if (generalService.checkNumbersAndUniqueInArray(arrayResult)) {
      this.result = arrayResult;
      return this.result;
    } else return undefined;
  }

  computeDividend() {
    let dividend = [];
    dividend.push(this.computeWinDividend());
    dividend = dividend.concat(this.computePlaceDividend());
    dividend.push(this.computeExactaDividend());
    return dividend;
  }

  getSliceResult(begin, end) {
    if (generalService.checkNumbersAndUniqueInArray(this.result)) {
      return this.result.slice(begin, end);
    } else return undefined;
  }

  computePlaceDividend() {
    const placeResult = this.getSliceResult(0, 3);
    if (placeResult) {
      const pot = raceService.computePot(this.placePool, ProductType.P);
      const thirdOfPot = pot / 3;
      const dividend = placeResult.map(horse =>
        raceService.computeOneHorseDividend(
          horse,
          thirdOfPot,
          this.placePool,
          ProductType.P
        )
      );
      return dividend;
    } else return undefined;
  }

  getWinResult() {
    if (generalService.checkNumbersAndUniqueInArray(this.result)) {
      return this.result[0];
    } else return undefined;
  }

  computeWinDividend() {
    const winResult = this.getWinResult();
    const pot = raceService.computePot(this.winPool, ProductType.W);
    return raceService.computeOneHorseDividend(
      winResult,
      pot,
      this.winPool,
      ProductType.W
    );
  }

  computeExactaDividend() {
    const exactaResult = this.getSliceResult(0, 2);
    if (exactaResult && exactaResult.length === 2) {
      const pot = raceService.computePot(this.exactaPool, ProductType.E);
      if (Array.isArray(exactaResult) && pot) {
        const addedWinningStakes = this.exactaPool.reduce(
          (sum, bet) => {
            if (
              Array.isArray(bet.selection) &&
              bet.selection.length === 2 &&
              bet.selection.length == exactaResult.length &&
              bet.selection.every((element, index) => {
                return element === exactaResult[index];
              })
            ) {
              return { stake: sum.stake + bet.stake };
            } else {
              return { stake: sum.stake };
            }
          },
          { stake: 0 }
        ).stake;
        if (addedWinningStakes === 0)
          return new Dividend(
            ProductType.properties[ProductType.E].name,
            exactaResult,
            0
          );
        else
          return new Dividend(
            ProductType.properties[ProductType.E].name,
            exactaResult,
            (pot / addedWinningStakes).toFixed(2)
          );
      }
    }
  }
};
