import { describe, expect, it } from "bun:test";
import preset from "../preset";

describe("preset", () => {
  it("should export a valid tailwind config object", () => {
    expect(preset).toBeDefined();
    expect(preset.theme).toBeDefined();
  });

  describe("spacing", () => {
    it("should have spacing values", () => {
      expect(preset.theme.spacing).toBeDefined();
      expect(Object.keys(preset.theme.spacing).length).toBeGreaterThan(0);
    });

    it("should have px value as 1px", () => {
      expect(preset.theme.spacing.px).toBe("1px");
    });

    it("should have 0 value as 0px", () => {
      expect(preset.theme.spacing[0]).toBe("0px");
    });

    it("should generate CSS variable references for numeric values", () => {
      // @ts-expect-error test
      expect(preset.theme.spacing[1]).toMatch(/var\(--scale-\d+\)/);
      // @ts-expect-error test
      expect(preset.theme.spacing[100]).toMatch(/var\(--scale-\d+\)/);
    });
  });

  describe("fontSize", () => {
    it("should have fontSize values", () => {
      expect(preset.theme.fontSize).toBeDefined();
    });

    it("should have standard font size keys", () => {
      const fontSizes = preset.theme.fontSize;
      expect(fontSizes.xs).toBeDefined();
      expect(fontSizes.sm).toBeDefined();
      expect(fontSizes.base).toBeDefined();
      expect(fontSizes.lg).toBeDefined();
      expect(fontSizes.xl).toBeDefined();
    });

    it("should use CSS variables for font sizes", () => {
      expect(preset.theme.fontSize.base).toMatch(/var\(--scale-\d+\)/);
    });
  });

  describe("borderRadius", () => {
    it("should have borderRadius values", () => {
      expect(preset.theme.borderRadius).toBeDefined();
    });

    it("should have none value as 0", () => {
      expect(preset.theme.borderRadius.none).toBe("0");
    });

    it("should have full value as 9999px", () => {
      expect(preset.theme.borderRadius.full).toBe("9999px");
    });

    it("should use CSS variables for numeric radius values", () => {
      expect(preset.theme.borderRadius.md).toMatch(/var\(--scale-\d+\)/);
    });
  });

  describe("zIndex", () => {
    it("should have zIndex values", () => {
      expect(preset.theme.zIndex).toBeDefined();
    });

    it("should have negative z-index", () => {
      expect(preset.theme.zIndex["-1"]).toBe("-1");
    });

    it("should have positive z-index values", () => {
      expect(preset.theme.zIndex["10"]).toBe("10");
      expect(preset.theme.zIndex["100"]).toBe("100");
    });
  });

  describe("borderWidth", () => {
    it("should have borderWidth values", () => {
      expect(preset.theme.borderWidth).toBeDefined();
    });

    it("should have 0 border width", () => {
      expect(preset.theme.borderWidth[0]).toBe("0");
    });

    it("should use CSS variables for other border widths", () => {
      expect(preset.theme.borderWidth[1]).toMatch(/var\(--scale-\d+\)/);
    });
  });

  describe("spacingX and spacingY", () => {
    it("should have spacingX with screen value", () => {
      expect(preset.theme.spacingX).toBeDefined();
      expect(preset.theme.spacingX.screen).toBe("var(--screen-width)");
    });

    it("should have spacingY with screen value", () => {
      expect(preset.theme.spacingY).toBeDefined();
      expect(preset.theme.spacingY.screen).toBe("var(--screen-height)");
    });
  });
});
