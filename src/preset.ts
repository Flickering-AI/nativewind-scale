import type { Config } from "tailwindcss";
import { scaleVar } from "./scale-var";

const space = 1;
const spacing = [...new Array(813).keys()];

const spacingVar = Object.fromEntries(
  spacing.map((s) => [s, scaleVar(s * space)]),
);

const combinedSpacing = {
  ...spacingVar,

  px: "1px",
  0: "0px",
  0.5: scaleVar(2),
  "screen-x": "var(--screen-width)",
  "screen-y": "var(--screen-height)",
};

export default {
  theme: {
    spacing: combinedSpacing,
    fontSize: {
      xxs: scaleVar(10),
      xs: scaleVar(12),
      sm: scaleVar(14),
      base: scaleVar(16),
      lg: scaleVar(18),
      xl: scaleVar(20),
      "2xl": scaleVar(24),
      "3xl": scaleVar(30),
      "4xl": scaleVar(36),
      "5xl": scaleVar(48),
      "6xl": scaleVar(60),
      "7xl": scaleVar(72),
      "8xl": scaleVar(96),
      "9xl": scaleVar(128),
    },
    borderRadius: {
      ...Object.fromEntries(
        [...new Array(101).keys()].map((s) => [s, scaleVar(s * space)]),
      ),
      none: "0",
      sm: scaleVar(2),
      base: scaleVar(4),
      md: scaleVar(6),
      lg: scaleVar(8),
      xl: scaleVar(12),
      "2xl": scaleVar(16),
      "3xl": scaleVar(24),
      full: "9999px",
    },
    zIndex: {
      "-1": "-1",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
      17: "17",
      18: "18",
      19: "19",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      60: "60",
      70: "70",
      80: "80",
      90: "90",
      100: "100",
    },
    borderWidth: {
      0: "0",
      1: scaleVar(1),
      2: scaleVar(2),
      3: scaleVar(3),
      4: scaleVar(4),
      5: scaleVar(5),
      6: scaleVar(6),
      7: scaleVar(7),
      8: scaleVar(8),
      9: scaleVar(9),
      10: scaleVar(10),
    },
  },
} satisfies Partial<Config>;
