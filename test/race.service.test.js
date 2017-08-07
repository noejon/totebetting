"use strict";
const assert = require("assert");
const raceService = require("../race.service");
const Bet = require("../bet").Bet;
const ProductType = require("../enums").ProductType;

describe("RaceService", () => {
  describe("#computeOneHorseDividend", () => {
    it("computeOneHorseDividend(horse, pot, pool, product)", () => {
      let pool = [
        new Bet(ProductType.W, [1], 11),
        new Bet(ProductType.W, [2], 12),
        new Bet(ProductType.W, [3], 13),
        new Bet(ProductType.W, [4], 14),
        new Bet(ProductType.W, [5], 15)
      ];
      assert.deepEqual(
        {
          myYield: (65 *
            ProductType.properties[ProductType.W].sharedPot /
            11).toFixed(2),
          selection: [1],
          product: ProductType.properties[ProductType.W].name
        },
        raceService.computeOneHorseDividend(
          1,
          65 * ProductType.properties[ProductType.W].sharedPot,
          pool,
          ProductType.W
        )
      );
    });
  });
  describe("#computePot", () => {
    it("One bet with stake 10 should return 10", () => {
      let pot = [new Bet(ProductType.W, [1], 10)];
      assert.equal(
        10 * ProductType.properties[ProductType.W].sharedPot,
        raceService.computePot(pot, ProductType.W)
      );
    });
    it("Forgetting the product type should return 0", () => {
      let pot = [new Bet(ProductType.W, [1], 10)];
      assert.equal(0, raceService.computePot(pot));
    });
    it("Two bets with stake 12, 23 should return 35", () => {
      let pot = [
        new Bet(ProductType.W, [1], 12),
        new Bet(ProductType.W, [1], 23)
      ];
      assert.equal(
        35 * ProductType.properties[ProductType.W].sharedPot,
        raceService.computePot(pot, ProductType.W)
      );
    });
    it("Bets with stakes 11, 12, 13, 14, 15 should return 65", () => {
      let pot = [
        new Bet(ProductType.W, [1], 11),
        new Bet(ProductType.W, [1], 12),
        new Bet(ProductType.W, [1], 13),
        new Bet(ProductType.W, [1], 14),
        new Bet(ProductType.W, [1], 15)
      ];
      assert.equal(
        65 * ProductType.properties[ProductType.W].sharedPot,
        raceService.computePot(pot, ProductType.W)
      );
    });
    it("Bets with stakes 11, 13, 14, 15 on W and 12 on E should return 53", () => {
      let pot = [
        new Bet(ProductType.W, [1], 11),
        new Bet(ProductType.E, [1], 12),
        new Bet(ProductType.W, [1], 13),
        new Bet(ProductType.W, [1], 14),
        new Bet(ProductType.W, [1], 15)
      ];
      assert.equal(
        53 * ProductType.properties[ProductType.W].sharedPot,
        raceService.computePot(pot, ProductType.W)
      );
    });
    it("Empty pot should return 0", () => {
      let pot = [];
      assert.equal(0, raceService.computePot([]));
    });
    it("Undefined pot should return 0", () => {
      assert.equal(0, raceService.computePot(undefined));
    });
  });
});
