import { mock } from "bun:test";

// Mock react-native before any imports
mock.module("react-native", () => ({
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  PixelRatio: {
    roundToNearestPixel: (value: number) => Math.round(value * 2) / 2,
  },
  View: "View",
  ScaledSize: {},
}));

// Mock nativewind
mock.module("nativewind", () => ({
  vars: (obj: Record<string, unknown>) => obj,
}));

// Mock react-native-safe-area-context
mock.module("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
