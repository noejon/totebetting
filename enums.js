"use strict";

const productType = {
  W: 1,
  P: 2,
  E: 3,
  properties: {
    1: { name: "Win", value: 1, code: "W", sharedPot: 0.85 },
    2: { name: "Place", value: 2, code: "P", sharedPot: 0.88 },
    3: { name: "Exacta", value: 3, code: "E", sharedPot: 0.82 }
  },
  getValue: identifier => {
    if (!identifier) return undefined;
    let value;
    for (let key of Object.keys(productType)) {
      if (
        key === identifier &&
        typeof productType[key] !== "function" &&
        key !== "properties"
      ) {
        value = productType[key];
        break;
      }
    }
    return value;
  },
  isValue: value => {
    if (!value) return false;
    let found = false;
    for (let key of Object.keys(productType)) {
      if (productType[key] === value) {
        found = true;
        break;
      }
    }
    return found;
  },
  isIdentifier: value => {
    if (!value) return false;
    let found = false;
    Object.keys(productType).some(key => {
      if (
        key === value &&
        typeof productType[key] !== "function" &&
        key !== "properties"
      ) {
        found = true;
        return true;
      }
    });
    return found;
  }
};
if (Object.freeze) Object.freeze(productType);
exports.ProductType = productType;
