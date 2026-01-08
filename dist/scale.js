"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scale = exports.ScaleReference = void 0;
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
class ScaleReference {
    static width = 375;
    static height = 667;
    static isTablet = false;
}
exports.ScaleReference = ScaleReference;
/**
 * Scales a given size to the device's screen size.
 *
 * @param {number} size The size to scale.
 * @param {number} [tabletSize] The size to scale to when on a tablet, if undefined, will use the given size.
 * @returns {number} The scaled size.
 */
const scale = (size, tabletSize) => {
    'worklet';
    const finalSize = tabletSize !== undefined && ScaleReference.isTablet ? tabletSize : size;
    return react_native_1.PixelRatio.roundToNearestPixel(Math.min(shortDimension / ScaleReference.width, longDimension / ScaleReference.height) *
        finalSize);
};
exports.scale = scale;
