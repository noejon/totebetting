"use strict";
const assert = require("assert");
const Bet = require("../bet").Bet;
const enums = require("../enums");
const ReturnMessage = enums.ReturnMessage;
const ProductType = enums.ProductType;

describe("Bet", () => {
  describe("#isBetConsistant", () => {
    it("Bet {ProductType.W, [1], 13} calling isBetConsistant() should return true", () => {
      const bet = new Bet(ProductType.W, [1], 13);
      assert.equal(true, bet.isBetConsistant());
    });
    it("A win bet can accept only one horse thus bet {ProductType.W, [1, 2], 13)} calling isBetConsistant() should return false", () => {
      const bet = new Bet(ProductType.W, [1, 2], 13);
      assert.equal(false, bet.isBetConsistant());
    });
    it("Bet {ProductType.P, [1], 13)} calling isBetConsistant() should return true", () => {
      const bet = new Bet(ProductType.P, [1], 13);
      assert.equal(true, bet.isBetConsistant());
    });
    it("A place bet can accept only one horse thus bet {ProductType.P, [1, 2], 13} calling isBetConsistant()) should return false", () => {
      const bet = new Bet(ProductType.P, [1, 2], 13);
      assert.equal(false, bet.isBetConsistant());
    });
    it("Bet {ProductType.E, [1, 2], 13} calling isBetConsistant() should return true", () => {
      const bet = new Bet(ProductType.E, [1, 2], 13);
      assert.equal(true, bet.isBetConsistant());
    });
    it("An exacta bet can accept two and only two horse only thus bet {ProductType.E, [1], 13} calling isBetConsistant() should return false", () => {
      const bet = new Bet(ProductType.E, [1], 13);
      assert.equal(false, bet.isBetConsistant());
    });
  });
});
