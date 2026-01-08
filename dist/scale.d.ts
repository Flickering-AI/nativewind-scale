export declare class ScaleReference {
    static width: number;
    static height: number;
    static isTablet: boolean;
}
/**
 * Scales a given size to the device's screen size.
 *
 * @param {number} size The size to scale.
 * @param {number} [tabletSize] The size to scale to when on a tablet, if undefined, will use the given size.
 * @returns {number} The scaled size.
 */
export declare const scale: (size: number, tabletSize?: number) => number;
