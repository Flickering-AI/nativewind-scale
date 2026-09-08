import { expect, it } from "bun:test";
import postcss from "postcss";
import { cssToReactNativeRuntime } from "react-native-css-interop/css-to-rn";
import tailwindcss from "tailwindcss";
import { NativewindWrapper } from "../nativewind-wrapper";
import preset from "../preset";

it("compiles tablet utilities against the wrapper's tablet state", async () => {
  const { css } = await postcss([
    tailwindcss({
      presets: [preset],
      content: [{ raw: "opacity-50 tablet:opacity-100" }],
    }),
  ]).process("@tailwind utilities;", { from: undefined });
  const { rules } = cssToReactNativeRuntime(css, {
    grouping: ["^group(/.*)?"],
  });
  const tablet = rules?.find(([name]) => name === "tablet:opacity-100")?.[1]
    .normal?.[0];

  expect(tablet).toBeDefined();
  expect(tablet?.media).toBeUndefined();
  expect(tablet?.containerQuery).toEqual([
    {
      name: "group/scale",
      attrs: [
        expect.objectContaining({
          type: "data-attribute",
          name: "tablet",
          operation: expect.objectContaining({
            operator: "equal",
            value: "true",
          }),
        }),
      ],
    },
  ]);
  expect(
    rules?.find(([name]) => name === "opacity-50")?.[1].normal?.[0]
      .containerQuery,
  ).toBeUndefined();
});

it("exposes the current isTablet value and defaults to false", () => {
  for (const isTablet of [true, false, undefined]) {
    const wrapper = NativewindWrapper({ config: { content: [], isTablet } });

    expect(wrapper.props.className).toBe("group/scale");
    expect(wrapper.props.dataSet).toEqual({
      tablet: String(isTablet ?? false),
    });
  }
});
