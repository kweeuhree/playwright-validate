import test, { describe } from "node:test";
import assert from "node:assert";
import { validateSort } from "../src/validate.js";
import {
  mockValidateInvalid,
  mockValidateValid,
} from "../testdata/validateMocks.js";

describe("validateSort function", () => {
  test("returns false", () => {
    mockValidateInvalid.forEach((testcase) => {
      const result = validateSort(testcase);
      assert.strictEqual(result, false);
    });
  });

  test("returns true", () => {
    mockValidateValid.forEach((testcase) => {
      const result = validateSort(testcase);
      assert.strictEqual(result, true);
    });
  });
});
