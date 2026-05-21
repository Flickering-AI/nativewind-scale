import { vars } from "nativewind";
import type { PropsWithChildren } from "react";
import { useWindowDimensions, View } from "react-native";

import { scale, ScaleReference } from "./scale";
import type { Config } from "tailwindcss";
import { scaleVariables } from "./scale-variables";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NativeWindWrapperProps = PropsWithChildren<{
  config: Config & {
    isTablet?: boolean;
  };
}>;

export function NativewindWrapper({
  children,
  config,
}: NativeWindWrapperProps) {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTablet = config.isTablet ?? false;

  ScaleReference.isTablet = isTablet;
  ScaleReference.setWindow(window);

  const variables = Object.entries(scaleVariables).map(([key, value]) => {
    const name = key.replace("var(--scale-", "").replace(")", "");

    if (name.startsWith("y")) {
      return [`--scale-${name}`, scale(value)] as const;
    }

    return [`--scale-${name}`, scale(value)] as const;
  });

  return (
    <View
      style={[
        { flex: 1 },
        vars({
          ...Object.fromEntries(variables),
          "--screen-width": window.width,
          "--screen-height": window.height,
          "--safe-t": insets.top,
          "--safe-b": insets.bottom,
          "--safe-l": insets.left,
          "--safe-r": insets.right,
        }),
      ]}
    >
      {children}
    </View>
  );
}
