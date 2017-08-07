"use strict";
const assert = require("assert");
const Race = require("../race").Race;
const Bet = require("../bet").Bet;
const enums = require("../enums");
const ReturnMessage = enums.ReturnMessage;
const ProductType = enums.ProductType;

describe("Race", () => {
  describe("#placeBet", () => {
    it("Placing bet {ProductType.W, [1], 13} should add that bet to the winPool", () => {
      const race = new Race();
      race.placeBet(ProductType.W, [1], 13);
      assert.deepEqual(
        [{ product: ProductType.W, selection: [1], stake: 13 }],
        race.winPool
      );
    });
    it("Placing bet {ProductType.W, [1, 2], 13} should not add that bet to the winPool", () => {
      const race = new Race();
      race.placeBet(ProductType.W, [1, 2], 13);
      assert.deepEqual([], race.winPool);
    });
    it("Placing bet {ProductType.P, [1], 13} should add that bet to the placePool", () => {
      const race = new Race();
      race.placeBet(ProductType.P, [1], 13);
      assert.deepEqual(
        [{ product: ProductType.P, selection: [1], stake: 13 }],
        race.placePool
      );
    });
    it("Placing bet {ProductType.P, [1, 2], 13} should not add that bet to the placePool", () => {
      const race = new Race();
      race.placeBet(ProductType.P, [1, 2], 13);
      assert.deepEqual([], race.placePool);
    });
    it("Placing bet {ProductType.E, [1, 2], 13} should add that bet to the exactaPool", () => {
      const race = new Race();
      race.placeBet(ProductType.E, [1, 2], 13);
      assert.deepEqual(
        [{ product: ProductType.E, selection: [1, 2], stake: 13 }],
        race.exactaPool
      );
    });
    it("Placing bet {ProductType.E, [1], 13} should not add that bet to the exactaPool", () => {
      const race = new Race();
      race.placeBet(ProductType.E, [1], 13);
      assert.deepEqual([], race.exactaPool);
    });
  });
  describe("#isPool", () => {
    it("Checking if winPool from a race is a pool should return true", () => {
      const race = new Race();
      assert.equal(true, race.isPool(race.winPool));
    });
    it("Checking if placePool from a race is a pool should return true", () => {
      const race = new Race();
      assert.equal(true, race.isPool(race.placePool));
    });
    it("Checking if exactaPool from a race is a pool should return true", () => {
      const race = new Race();
      assert.equal(true, race.isPool(race.exactaPool));
    });
    it("Checking if result from a race is a pool should return false", () => {
      const race = new Race();
      assert.equal(false, race.isPool(race.result));
    });
    it("Checking if nothing is a pool should return false", () => {
      const race = new Race();
      assert.equal(false, race.isPool());
    });
    it("Checking if undefined is a pool should return false", () => {
      const race = new Race();
      assert.equal(false, race.isPool(undefined));
    });
    it("Checking if []] is a pool should return false", () => {
      const race = new Race();
      assert.equal(false, race.isPool([]));
    });
    it("Checking if null is a pool should return false", () => {
      const race = new Race();
      assert.equal(false, race.isPool(null));
    });
  });
  describe("#setResult", () => {
    it("Adding the result [1, 2, 3 , 4] should set this array as result to the race and return it", () => {
      const race = new Race();
      assert.deepEqual([1, 2, 3, 4, 5], race.setResult([1, 2, 3, 4, 5]));
    });
    it("Adding the result ['test', 2, 5] should not set the array as result to the race and return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.setResult(["test", 2, 5]));
    });
    it("Adding the result [] should return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.setResult([]));
    });
    it("No arguments should return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.setResult());
    });
    it("Null as argument should return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.setResult(null));
    });
    it("Undefined as argument should return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.setResult(undefined));
    });
  });
  describe("#getWinResult", () => {
    it("result [1, 2, 3, 4, 5] should return 1", () => {
      const race = new Race();
      race.setResult([1, 2, 3, 4, 5]);
      assert.equal(1, race.getWinResult());
    });
    it("result [1, 1, 2, 3, 4, 5] should return undefined", () => {
      const race = new Race();
      race.setResult([1, 1, 2, 3, 4, 5]);
      assert.equal(undefined, race.getWinResult());
    });
    it("result ['test', 2, 5] should return undefined", () => {
      const race = new Race();
      race.setResult(["test", 2, 5]);
      assert.equal(undefined, race.getWinResult());
    });
    it("result [] should return undefined", () => {
      const race = new Race();
      race.setResult([]);
      assert.equal(undefined, race.getWinResult());
    });
    it("result ['1', '2', '3'] should return undefined", () => {
      const race = new Race();
      assert.equal(undefined, race.getWinResult(["1", "2", "3"]));
    });
  });
  describe("#getSliceResult", () => {
    it("result [1, 2, 3, 4, 5] should return [1, 2, 3] with begin 0, end 3", () => {
      const race = new Race();
      race.setResult([1, 2, 3, 4, 5]);
      assert.deepEqual([1, 2, 3], race.getSliceResult(0, 3));
    });
  });
  describe("#computeWinDividend", () => {
    it("Win bet on horse 1 yields 5.02$", () => {
      const race = new Race();
      race.winPool = [
        new Bet(ProductType.W, [1], 11),
        new Bet(ProductType.W, [2], 12),
        new Bet(ProductType.W, [3], 13),
        new Bet(ProductType.W, [4], 14),
        new Bet(ProductType.W, [5], 15)
      ];
      race.setResult([1, 2, 3]);
      assert.deepEqual(
        {
          myYield: (65 *
            ProductType.properties[ProductType.W].sharedPot /
            11).toFixed(2),
          selection: [1],
          product: ProductType.properties[ProductType.W].name
        },
        race.computeWinDividend()
      );
    });
    it("Win bet on horse 2 yields 2.61$", () => {
      const race = new Race();
      race.winPool = [
        new Bet(ProductType.W, [1], 3),
        new Bet(ProductType.W, [2], 4),
        new Bet(ProductType.W, [3], 5),
        new Bet(ProductType.W, [4], 5),
        new Bet(ProductType.W, [1], 16),
        new Bet(ProductType.W, [2], 8),
        new Bet(ProductType.W, [3], 22),
        new Bet(ProductType.W, [4], 57),
        new Bet(ProductType.W, [1], 42),
        new Bet(ProductType.W, [2], 98),
        new Bet(ProductType.W, [3], 63),
        new Bet(ProductType.W, [4], 15)
      ];
      race.setResult([2, 3, 1]);
      assert.deepEqual(
        {
          myYield: (338 *
            ProductType.properties[ProductType.W].sharedPot /
            110).toFixed(2),
          selection: [2],
          product: ProductType.properties[ProductType.W].name
        },
        race.computeWinDividend()
      );
    });
  });
  describe("#computePlaceDividend", () => {
    it(`Place bet on horse 2 yields 1.06$
        Place bet on horse 3 yields 1.27$
        Place bet on horse 1 yields 2.13$`, () => {
      const race = new Race();
      race.placePool = [
        new Bet(ProductType.P, [1], 31),
        new Bet(ProductType.P, [2], 89),
        new Bet(ProductType.P, [3], 28),
        new Bet(ProductType.P, [4], 72),
        new Bet(ProductType.P, [1], 40),
        new Bet(ProductType.P, [2], 16),
        new Bet(ProductType.P, [3], 82),
        new Bet(ProductType.P, [4], 52),
        new Bet(ProductType.P, [1], 18),
        new Bet(ProductType.P, [2], 74),
        new Bet(ProductType.P, [3], 39),
        new Bet(ProductType.P, [4], 105)
      ];
      race.setResult([2, 3, 1]);
      assert.deepEqual(
        [
          {
            myYield: 1.06,
            selection: [2],
            product: ProductType.properties[ProductType.P].name
          },
          {
            myYield: 1.27,
            selection: [3],
            product: ProductType.properties[ProductType.P].name
          },
          {
            myYield: 2.13,
            selection: [1],
            product: ProductType.properties[ProductType.P].name
          }
        ],
        race.computePlaceDividend()
      );
    });
  });
  describe("#computeExactaDividend", () => {
    it(`Place bet on horse 2, 3 yields 2.43$`, () => {
      const race = new Race();
      race.exactaPool = [
        new Bet(ProductType.E, [1, 2], 13),
        new Bet(ProductType.E, [2, 3], 98),
        new Bet(ProductType.E, [1, 3], 82),
        new Bet(ProductType.E, [3, 2], 27),
        new Bet(ProductType.E, [1, 2], 5),
        new Bet(ProductType.E, [2, 3], 61),
        new Bet(ProductType.E, [1, 3], 28),
        new Bet(ProductType.E, [3, 2], 25),
        new Bet(ProductType.E, [1, 2], 81),
        new Bet(ProductType.E, [2, 3], 47),
        new Bet(ProductType.E, [1, 3], 93),
        new Bet(ProductType.E, [3, 2], 51)
      ];
      race.setResult([2, 3, 1]);
      assert.deepEqual(
        {
          myYield: 2.43,
          selection: [2, 3],
          product: ProductType.properties[ProductType.E].name
        },
        race.computeExactaDividend()
      );
    });
  });
});
