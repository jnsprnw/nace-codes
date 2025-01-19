import { describe, it, expect } from "bun:test";
import { getCode } from "./code.ts";
import { BadRequestError, NotFoundError } from "./code.ts";

describe("getCode Function Tests", () => {
  // Test for a valid division
  it("should return correct details for a valid division code '01'", () => {
    const code = "01";
    const result = getCode(code);
    expect(result.section).toBe("A");
    expect(result.division).toEqual({
      description:
        "Crop and animal production, hunting and related service activities",
      id: "01",
    });
    expect(result.group).toBeUndefined();
    expect(result.class).toBeUndefined();
  });

  // Test for a valid group
  it("should return correct details for a valid group code '01.1'", () => {
    const code = "01.1";
    const result = getCode(code);
    expect(result.section).toBe("A");
    expect(result.division).toEqual({
      description:
        "Crop and animal production, hunting and related service activities",
      id: "01",
    });
    expect(result.group).toEqual({
      description: "Growing of non-perennial crops",
      id: "01.1",
    });
    expect(result.class).toBeUndefined();
  });

  // Test for a valid class
  it("should return correct details for a valid class code '01.11'", () => {
    const code = "01.11";
    const result = getCode(code);
    expect(result.section).toBe("A");
    expect(result.division).toEqual({
      description:
        "Crop and animal production, hunting and related service activities",
      id: "01",
    });
    expect(result.group).toEqual({
      description: "Growing of non-perennial crops",
      id: "01.1",
    });
    expect(result.class).toEqual({
      description:
        "Growing of cereals (except rice), leguminous crops and oil seeds",
      id: "01.11",
    });
  });

  // Test for a missing code (empty string)
  it("should throw BadRequestError when no code is provided", () => {
    const code = "";
    expect(() => getCode(code)).toThrow(BadRequestError);
    try {
      getCode(code);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
      expect((e as BadRequestError).statusCode).toBe(400);
      expect(e.message).toBe("No code provided.");
    }
  });

  // Test for an invalid format
  it("should throw BadRequestError for an invalid code format 'invalid'", () => {
    const code = "invalid";
    expect(() => getCode(code)).toThrow(BadRequestError);
    try {
      getCode(code);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
      expect((e as BadRequestError).statusCode).toBe(400);
      expect(e.message).toBe("The provided code has an invalid format.");
    }
  });

  // Test for a non-existent division
  it("should throw NotFoundError when the division does not exist '100'", () => {
    const code = "100";
    expect(() => getCode(code)).toThrow(NotFoundError);
    try {
      getCode(code);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      expect((e as NotFoundError).statusCode).toBe(404);
      expect(e.message).toBe("No division found with ID 100.");
    }
  });

  // Test for a non-existent group
  it("should throw NotFoundError when the group does not exist '01.9'", () => {
    const code = "01.9";
    expect(() => getCode(code)).toThrow(NotFoundError);
    try {
      getCode(code);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      expect((e as NotFoundError).statusCode).toBe(404);
      expect(e.message).toBe("No group found with ID 01.9.");
    }
  });

  // Test for a non-existent class
  it("should throw NotFoundError when the class does not exist '01.20'", () => {
    const code = "01.20";
    expect(() => getCode(code)).toThrow(NotFoundError);
    try {
      getCode(code);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      expect((e as NotFoundError).statusCode).toBe(404);
      expect(e.message).toBe("No class found with ID 01.20.");
    }
  });

  // Test for a valid class code '01.12'
  it("should return correct details for a valid class code '01.12'", () => {
    const code = "01.12";
    const result = getCode(code);
    expect(result.section).toBe("A");
    expect(result.division).toEqual({
      description:
        "Crop and animal production, hunting and related service activities",
      id: "01",
    });
    expect(result.group).toEqual({
      description: "Growing of non-perennial crops",
      id: "01.1",
    });
    expect(result.class).toEqual({
      description: "Growing of rice",
      id: "01.12",
    });
  });

  // Test for a valid class code '01.13'
  it("should return correct details for a valid class code '01.13'", () => {
    const code = "01.13";
    const result = getCode(code);
    expect(result.section).toBe("A");
    expect(result.division).toEqual({
      description:
        "Crop and animal production, hunting and related service activities",
      id: "01",
    });
    expect(result.group).toEqual({
      description: "Growing of non-perennial crops",
      id: "01.1",
    });
    expect(result.class).toEqual({
      description: "Growing of vegetables and melons, roots and tubers",
      id: "01.13",
    });
  });
});
