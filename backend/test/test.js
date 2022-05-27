"use strict";
import { expect } from "chai";
import { randBetween, smallestInt, largestInt } from "../lib/utils.js";

describe("Utils", function () {
  describe("randBetween", function () {
    it("Returns a (random) integer between a and b", function () {
      const [a, b] = [1, 5];
      let allGood = true;
      for (let i = 0; i < 10; i += 1) {
        const n = randBetween(a, b);
        if (n < a) {
          allGood = false;
        }
        if (n > b) {
          allGood = false;
        }
      }
      expect(allGood).to.be.true;
    });
  });

  describe("smallestInt", function () {
    it("Returns the smallest n digit integer", function () {
      expect(smallestInt(1)).to.equal(0);
      expect(smallestInt(2)).to.equal(10);
      expect(smallestInt(3)).to.equal(100);
      expect(smallestInt(10)).to.equal(1000000000);
    });
  });

  describe("largestInt", function () {
    it("Returns the smallest n digit integer", function () {
      expect(largestInt(1)).to.equal(9);
      expect(largestInt(2)).to.equal(99);
      expect(largestInt(3)).to.equal(999);
      expect(largestInt(10)).to.equal(9999999999);
    });
  });
});

// TODO TEST op_tuple
