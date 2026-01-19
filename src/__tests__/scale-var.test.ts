import { describe, expect, it, beforeEach } from "bun:test";
import { scaleVar, getScaleVariableName } from "../scale-var";
import { scaleVariables } from "../scale-variables";

describe("scaleVar", () => {
  beforeEach(() => {
    // 清空 scaleVariables
    for (const key in scaleVariables) {
      delete scaleVariables[key];
    }
  });

  it("should return a CSS variable name for integer values", () => {
    const result = scaleVar(16);
    expect(result).toBe("var(--scale-16)");
  });

  it("should handle decimal values by replacing dots with underscores", () => {
    const result = scaleVar(1.5);
    expect(result).toBe("var(--scale-1_5)");
  });

  it("should store the value in scaleVariables", () => {
    scaleVar(24);
    expect(scaleVariables["var(--scale-24)"]).toBe(24);
  });

  it("should store decimal values correctly", () => {
    scaleVar(0.5);
    expect(scaleVariables["var(--scale-0_5)"]).toBe(0.5);
  });

  it("should not overwrite existing values", () => {
    scaleVar(10);
    scaleVariables["var(--scale-10)"] = 999; // 手动修改
    scaleVar(10); // 再次调用
    expect(scaleVariables["var(--scale-10)"]).toBe(999);
  });
});

describe("getScaleVariableName", () => {
  beforeEach(() => {
    for (const key in scaleVariables) {
      delete scaleVariables[key];
    }
  });

  it("should create correct variable name", () => {
    const result = getScaleVariableName("test", 100);
    expect(result).toBe("var(--scale-test)");
    expect(scaleVariables["var(--scale-test)"]).toBe(100);
  });

  it("should not overwrite existing variable", () => {
    getScaleVariableName("existing", 50);
    getScaleVariableName("existing", 100);
    expect(scaleVariables["var(--scale-existing)"]).toBe(50);
  });
});
