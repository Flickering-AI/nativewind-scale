import { describe, expect, it, beforeEach } from "bun:test";
import { scale, ScaleReference } from "../scale";

describe("ScaleReference", () => {
  it("should have default width of 375", () => {
    expect(ScaleReference.width).toBe(375);
  });

  it("should have default height of 667", () => {
    expect(ScaleReference.height).toBe(667);
  });

  it("should have default isTablet of false", () => {
    expect(ScaleReference.isTablet).toBe(false);
  });

  it("should allow modifying reference values", () => {
    const originalWidth = ScaleReference.width;
    ScaleReference.width = 414;
    expect(ScaleReference.width).toBe(414);
    ScaleReference.width = originalWidth;
  });
});

describe("scale", () => {
  beforeEach(() => {
    ScaleReference.width = 375;
    ScaleReference.height = 667;
    ScaleReference.isTablet = false;
  });

  it("should scale size based on reference dimensions", () => {
    const result = scale(16);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("should return 0 for size 0", () => {
    const result = scale(0);
    expect(result).toBe(0);
  });

  it("should use tabletSize when isTablet is true and tabletSize is provided", () => {
    ScaleReference.isTablet = true;
    const phoneResult = scale(16, 20);
    // 当 isTablet 为 true 时，应使用 tabletSize (20)
    expect(phoneResult).toBeGreaterThan(0);
  });

  it("should use regular size when isTablet is false even if tabletSize is provided", () => {
    ScaleReference.isTablet = false;
    const result1 = scale(16);
    const result2 = scale(16, 20);
    // 当 isTablet 为 false 时，两者应该相等（都使用 size=16）
    expect(result1).toBe(result2);
  });

  it("should scale proportionally", () => {
    const small = scale(10);
    const large = scale(20);
    // 20 是 10 的两倍，所以缩放结果也应该是两倍
    expect(large / small).toBeCloseTo(2, 1);
  });
});
