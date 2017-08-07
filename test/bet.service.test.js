"use strict";
const assert = require("assert");
const betService = require("../bet.service");
const enums = require("../enums");
const ReturnMessage = enums.ReturnMessage;
const ProductType = enums.ProductType;

describe("BetService", () => {
  describe("#isBetConsistant", () => {
    it("isBetConsistant(ProductType.W, [1], 13) should return true", () => {
      assert.equal(true, betService.isBetConsistant(ProductType.W, [1], 13));
    });
    it("A win bet can accept only one horse thus isBetConsistant(ProductType.W, [1, 2], 13)) should return false", () => {
      assert.equal(false, betService.isBetConsistant(ProductType.W, [1, 2], 13));
    });
    it("isBetConsistant(ProductType.P, [1], 13)) should return true", () => {
      assert.equal(true, betService.isBetConsistant(ProductType.P, [1], 13));
    });
    it("A place bet can accept only one horse thus isBetConsistant(ProductType.P, [1, 2], 13)) should return false", () => {
      assert.equal(false, betService.isBetConsistant(ProductType.P, [1, 2], 13));
    });
    it("isBetConsistant(isBetConsistant(ProductType.E, [1, 2], 13)) should return true", () => {
      assert.equal(true, betService.isBetConsistant(ProductType.E, [1, 2], 13));
    });
    it("An exacta bet can accept two and only two horse only thus isBetConsistant(ProductType.E, [1], 13) should return false", () => {
      assert.equal(false, betService.isBetConsistant(ProductType.E, [1], 13));
    });
  });
  describe("#checkSelectionBet", () => {
    it("checkSelectionBet([1], 1) should return true", () => {
      assert.equal(true, betService.checkSelectionBet([1], 1));
    });
    it("checkSelectionBet([1, 2], 1) should return false", () => {
      assert.equal(false, betService.checkSelectionBet([1, 2], 1));
    });
    it("checkSelectionBet([1, 2], 2) should return true", () => {
      assert.equal(true, betService.checkSelectionBet([1, 2], 2));
    });
    it("checkSelectionBet([1], 2) should return false", () => {
      assert.equal(false, betService.checkSelectionBet([1, 2], 1));
    });
    it("checkSelectionBet([]) should return false", () => {
      assert.equal(false, betService.checkSelectionBet([]));
    });
    it("checkSelectionBet(['1'], 1) should return false", () => {
      assert.equal(false, betService.checkSelectionBet(['1'], 1));
    });
    it("checkSelectionBet() should return false", () => {
      assert.equal(false, betService.checkSelectionBet());
    });
    it("checkSelectionBet(undefined) should return false", () => {
      assert.equal(false, betService.checkSelectionBet(undefined));
    });
    it("checkSelectionBet(null) should return false", () => {
      assert.equal(false, betService.checkSelectionBet(null));
    });
  });
});
