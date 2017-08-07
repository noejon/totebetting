"use strict";
const assert = require("assert");
const generalService = require("../general.service");

describe("GeneralService", () => {
  describe("#checkNumbersAndUniqueInArray", () => {
    it("checkNumbersAndUniqueInArray([1]) should return true", () => {
      assert.equal(true, generalService.checkNumbersAndUniqueInArray([1]));
    });
    it("checkNumbersAndUniqueInArray(['1']) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray(['1']));
    });
    it("checkNumbersAndUniqueInArray([1, 1]) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray([1, 1]));
    });
    it("checkNumbersAndUniqueInArray(['1', 1]) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray(['1', 1]));
    });
    it("checkNumbersAndUniqueInArray([1, 2, 3]) should return true", () => {
      assert.equal(true, generalService.checkNumbersAndUniqueInArray([1, 2, 3]));
    });
     it("checkNumbersAndUniqueInArray([1, 2, 3, 3]) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray([1, 2, 3, 3]));
    });
    it("checkNumbersAndUniqueInArray([1, 2, 'error']) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray([1, 2, "error"]));
    });
    it("checkNumbersAndUniqueInArray() should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray());
    });
    it("checkNumbersAndUniqueInArray([]) should return false", () => {
      assert.equal(false, generalService.checkNumbersAndUniqueInArray([]));
    });
  });
  describe("#checkIfArrayHasOnlyNumbers", () => {
    it("checkIfArrayHasOnlyNumbers([1]) should return true", () => {
      assert.equal(true, generalService.checkIfArrayHasOnlyNumbers([1]));
    });
    it("checkIfArrayHasOnlyNumbers(['1']) should return false", () => {
      assert.equal(false, generalService.checkIfArrayHasOnlyNumbers(['1']));
    });
    it("checkIfArrayHasOnlyNumbers([1, 2, 3]) should return true", () => {
      assert.equal(true, generalService.checkIfArrayHasOnlyNumbers([1, 2, 3]));
    });
    it("checkIfArrayHasOnlyNumbers([1, 2, 'error']) should return false", () => {
      assert.equal(false, generalService.checkIfArrayHasOnlyNumbers([1, 2, "error"]));
    });
    it("checkIfArrayHasOnlyNumbers() should return false", () => {
      assert.equal(false, generalService.checkIfArrayHasOnlyNumbers());
    });
    it("checkIfArrayHasOnlyNumbers([]) should return false", () => {
      assert.equal(false, generalService.checkIfArrayHasOnlyNumbers([]));
    });
  });
  describe("#checkIfArrayIsUnique", () => {
    it("checkIfArrayIsUnique([1, 1]) should return true", () => {
      assert.equal(true, generalService.checkIfArrayIsUnique([1]));
    });
    it("checkIfArrayIsUnique(['not unique', 'not unique']) should return false", () => {
      assert.equal(false, generalService.checkIfArrayIsUnique(['not unique', 'not unique']));
    });
    it("checkIfArrayIsUnique(['1']) should return true", () => {
      assert.equal(true, generalService.checkIfArrayIsUnique(['1']));
    });
    it("checkIfArrayIsUnique([1, 2, 3]) should return true", () => {
      assert.equal(true, generalService.checkIfArrayIsUnique([1, 2, 3]));
    });
    it("checkIfArrayIsUnique([1, 2, 'error']) should return true", () => {
      assert.equal(true, generalService.checkIfArrayIsUnique([1, 2, "error"]));
    });
    it("checkIfArrayIsUnique() should return false", () => {
      assert.equal(false, generalService.checkIfArrayIsUnique());
    });
    it("checkIfArrayIsUnique([]) should return true", () => {
      assert.equal(true, generalService.checkIfArrayIsUnique([]));
    });
  });
});
