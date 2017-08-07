"use strict";
const assert = require("assert");
const enums = require("../enums");
const ProductType = enums.ProductType;

describe("ProductType", () => {
  describe("#isValue", () => {
    it("isValue(1) should return true", () => {
      assert.equal(true, ProductType.isValue(1));
    });
    it("isValue(2) should return true", () => {
      assert.equal(true, ProductType.isValue(2));
    });
    it("isValue(3) should return true", () => {
      assert.equal(true, ProductType.isValue(3));
    });
    it("isValue(0) should return false", () => {
      assert.equal(false, ProductType.isValue(0));
    });
    it("isValue(4) should return false", () => {
      assert.equal(false, ProductType.isValue(4));
    });
    it("isValue(null) should return false", () => {
      assert.equal(false, ProductType.isValue(null));
    });
    it("isValue(undefined) should return false", () => {
      assert.equal(false, ProductType.isValue(undefined));
    });
    it("isValue() should return undefined", () => {
      assert.equal(false, ProductType.isValue());
    });
  });
  describe("#getValue", () => {
    it("getValue('W') should return 1", () => {
      assert.equal(1, ProductType.getValue('W'));
    });
    it("getValue('P') should return 2", () => {
      assert.equal(2, ProductType.getValue('P'));
    });
    it("getValue('E') should return 3", () => {
      assert.equal(3, ProductType.getValue('E'));
    });
    it("getValue('isIdentifier') should return undefined", () => {
      assert.equal(undefined, ProductType.getValue("isIdentifier"));
    });
    it("getValue('isValue') should return undefined", () => {
      assert.equal(undefined, ProductType.getValue("isValue"));
    });
    it("getValue('getValue') should return undefined", () => {
      assert.equal(undefined, ProductType.getValue("getValue"));
    });
    it("getValue('properties') should return undefined", () => {
      assert.equal(undefined, ProductType.getValue("properties"));
    });
    it("getValue('Random') should return undefined", () => {
      assert.equal(undefined, ProductType.getValue("Random"));
    });
    it("getValue() should return undefined", () => {
      assert.equal(undefined, ProductType.getValue());
    });
    it("getValue(undefined) should return undefined", () => {
      assert.equal(undefined, ProductType.getValue(undefined));
    });
    it("getValue(null) should return undefined", () => {
      assert.equal(undefined, ProductType.getValue(null));
    });
    it("getValue(0) should return undefined", () => {
      assert.equal(undefined, ProductType.getValue(0));
    });
  });
  describe("#isIdentifier", () => {
    it("isIdentifier('W') should return true", () => {
      assert.equal(true, ProductType.isIdentifier("W"));
    });
    it("isIdentifier('P') should return true", () => {
      assert.equal(true, ProductType.isIdentifier("P"));
    });
    it("isIdentifier('E') should return true", () => {
      assert.equal(true, ProductType.isIdentifier("E"));
    });
    it("isIdentifier('isIdentifier') should return false", () => {
      assert.equal(false, ProductType.isIdentifier("isIdentifier"));
    });
    it("isIdentifier('isValue') should return false", () => {
      assert.equal(false, ProductType.isIdentifier("isValue"));
    });
    it("isIdentifier('getValue') should return false", () => {
      assert.equal(false, ProductType.isIdentifier("getValue"));
    });
    it("isIdentifier('properties') should return false", () => {
      assert.equal(false, ProductType.isIdentifier("properties"));
    });
    it("isIdentifier('Random') should return false", () => {
      assert.equal(false, ProductType.isIdentifier("Random"));
    });
    it("isIdentifier() should return false", () => {
      assert.equal(false, ProductType.isIdentifier());
    });
    it("isIdentifier(undefined) should return false", () => {
      assert.equal(false, ProductType.isIdentifier(undefined));
    });
    it("isIdentifier(null) should return false", () => {
      assert.equal(false, ProductType.isIdentifier(null));
    });
    it("isIdentifier(0) should return false", () => {
      assert.equal(false, ProductType.isIdentifier(0));
    });
  });
});
