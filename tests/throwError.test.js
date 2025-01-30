import test, { describe } from "node:test";
import assert from "node:assert";
import { throwError } from "../src/errorHandler.js";
import { throwErrorMocks } from "../testdata/throwErrorMocks.js";

describe("throwError function", () => {
  test("formats error message", () => {
    throwErrorMocks.forEach((testcase) => {
      try {
        throwError(testcase.message, testcase.err);
      } catch (error) {
        assert.strictEqual(
          error.message,
          `ERROR\t${testcase.message}:\n\t${testcase.err}`
        );
      }
    });
  });
});
