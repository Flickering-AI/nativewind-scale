import { expect, it, spyOn } from "bun:test";
import postcss from "postcss";
import * as ReactNative from "react-native";
import tailwindcss from "tailwindcss";
import { NativewindWrapper } from "../nativewind-wrapper";
import preset from "../preset";

it("updates screen variables when the app window changes", () => {
  const useWindowDimensions = spyOn(ReactNative, "useWindowDimensions");

  try {
    for (const { width, height } of [
      { width: 900, height: 600 },
      { width: 600, height: 900 },
      { width: 500, height: 400 },
    ]) {
      useWindowDimensions.mockReturnValue({
        width,
        height,
        scale: 2,
        fontScale: 1,
      });
      const wrapper = NativewindWrapper({ config: { content: [] } });
      const variables = wrapper.props.style[1];

      expect(variables["--screen-width"]).toBe(width);
      expect(variables["--screen-height"]).toBe(height);
    }
  } finally {
    useWindowDimensions.mockRestore();
  }
});

it("compiles standard and existing screen utilities for window dimensions", async () => {
  const { css } = await postcss([
    tailwindcss({
      presets: [require("nativewind/preset"), preset],
      content: [{ raw: "w-screen h-screen w-screen-x h-screen-y" }],
    }),
  ]).process("@tailwind utilities;", { from: undefined });

  expect(css).toMatch(/\.w-screen\s*\{\s*width:\s*100vw/);
  expect(css).toMatch(/\.h-screen\s*\{\s*height:\s*100vh/);
  expect(css).toMatch(/\.w-screen-x\s*\{\s*width:\s*var\(--screen-width\)/);
  expect(css).toMatch(/\.h-screen-y\s*\{\s*height:\s*var\(--screen-height\)/);
});
