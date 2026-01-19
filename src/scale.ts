import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export class ScaleReference {
  static width = 375;
  static height = 667;
  static isTablet = false;
}

/**
 * Scales a given size to the device's screen size.
 *
 * @param {number} size The size to scale.
 * @param {number} [tabletSize] The size to scale to when on a tablet, if undefined, will use the given size.
 * @returns {number} The scaled size.
 */
export const scale = (size: number, tabletSize?: number) => {
  "worklet";
  const finalSize =
    tabletSize !== undefined && ScaleReference.isTablet ? tabletSize : size;

  return PixelRatio.roundToNearestPixel(
    Math.min(
      shortDimension / ScaleReference.width,
      longDimension / ScaleReference.height,
    ) * finalSize,
  );
};
