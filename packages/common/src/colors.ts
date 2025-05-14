import oc from "open-color";

import type { Merge } from "./utility-types";

export const COLOR_OUTLINE_CONTRAST_THRESHOLD = 240;

// FIXME can't put to utils.ts rn because of circular dependency
const pick = <R extends Record<string, any>, K extends readonly (keyof R)[]>(
  source: R,
  keys: K,
) => {
  return keys.reduce((acc, key: K[number]) => {
    if (key in source) {
      acc[key] = source[key];
    }
    return acc;
  }, {} as Pick<R, K[number]>) as Pick<R, K[number]>;
};

export type ColorPickerColor =
  | Exclude<keyof oc, "indigo" | "lime">
  | "transparent"
  | "bronze";
export type ColorTuple = readonly [string, string, string, string, string];
export type ColorPalette = Merge<
  Record<ColorPickerColor, ColorTuple>,
  { black: "#1e1e1e"; white: "#ffffff"; transparent: "transparent" }
>;

// used general type instead of specific type (ColorPalette) to support custom colors
export type ColorPaletteCustom = { [key: string]: ColorTuple | string };
export type ColorShadesIndexes = [number, number, number, number, number];

export const MAX_CUSTOM_COLORS_USED_IN_CANVAS = 5;
export const COLORS_PER_ROW = 5;

export const DEFAULT_CHART_COLOR_INDEX = 4;

export const DEFAULT_ELEMENT_STROKE_COLOR_INDEX = 4;
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX = 1;
export const ELEMENTS_PALETTE_SHADE_INDEXES = [0, 2, 4, 6, 8] as const;
export const CANVAS_PALETTE_SHADE_INDEXES = [0, 1, 2, 3, 4] as const;

export const getSpecificColorShades = (
  color: Exclude<
    ColorPickerColor,
    "transparent" | "white" | "black" | "bronze"
  >,
  indexArr: Readonly<ColorShadesIndexes>,
) => {
  // console.log("🎨 Generating shades for:", color, "from", oc[color]);
  return indexArr.map((index) => oc[color][index]) as any as ColorTuple;
};

// Override open-color defaults with Miden brand palette
oc.orange = [
  "#F4E8E3", // 0
  "#F6CEBB", // 1
  "#F9A57D", // 2
  "#FC6B23", // 3
  "#FF5500", // 4
  "#CC4600", // 5 (optional deeper tone)
  "#993200", // 6
  "#661F00", // 7
  "#330F00", // 8
  "#1A0800", // 9
];

oc.blue = [
  "#1764a8", // 0
  "#99BCE0", // 1
  "#0088FF", // 2 digital blue
  "#1764a8", // 3 bic blue
  "#192F32", // 4 midnight
  "#1764a8", // 5 (optional deep)
  "#00142A", // 6
  "#000C1A", // 7
  "#000711", // 8
  "#000305", // 9
];

export const COLOR_PALETTE = {
  transparent: "transparent",
  black: "#1e1e1e",
  white: "#ffffff",
  // orange: getSpecificColorShades("orange", ELEMENTS_PALETTE_SHADE_INDEXES),
  // blue: getSpecificColorShades("blue", ELEMENTS_PALETTE_SHADE_INDEXES),
  // open-colors
  gray: getSpecificColorShades("gray", ELEMENTS_PALETTE_SHADE_INDEXES),
  red: getSpecificColorShades("red", ELEMENTS_PALETTE_SHADE_INDEXES),
  pink: getSpecificColorShades("pink", ELEMENTS_PALETTE_SHADE_INDEXES),
  grape: getSpecificColorShades("grape", ELEMENTS_PALETTE_SHADE_INDEXES),
  violet: getSpecificColorShades("violet", ELEMENTS_PALETTE_SHADE_INDEXES),
  blue: getSpecificColorShades("blue", ELEMENTS_PALETTE_SHADE_INDEXES),
  cyan: getSpecificColorShades("cyan", ELEMENTS_PALETTE_SHADE_INDEXES),
  teal: getSpecificColorShades("teal", ELEMENTS_PALETTE_SHADE_INDEXES),
  green: getSpecificColorShades("green", ELEMENTS_PALETTE_SHADE_INDEXES),
  yellow: getSpecificColorShades("yellow", ELEMENTS_PALETTE_SHADE_INDEXES),
  orange: getSpecificColorShades("orange", ELEMENTS_PALETTE_SHADE_INDEXES),
  // radix bronze shades 3,5,7,9,11
  bronze: ["#f8f1ee", "#eaddd7", "#d2bab0", "#a18072", "#846358"],
} as ColorPalette;

const COMMON_ELEMENT_SHADES = pick(COLOR_PALETTE, [
  "cyan",
  "blue",
  "violet",
  "grape",
  "pink",
  "green",
  "teal",
  "yellow",
  "orange",
  "red",
]);

// -----------------------------------------------------------------------------
// quick picks defaults
// -----------------------------------------------------------------------------

// ORDER matters for positioning in quick picker
export const DEFAULT_ELEMENT_STROKE_PICKS = [
  COLOR_PALETTE.black,
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_STROKE_COLOR_INDEX - 1],
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_STROKE_COLOR_INDEX - 2],
  COLOR_PALETTE.blue[DEFAULT_ELEMENT_STROKE_COLOR_INDEX - 4],
  COLOR_PALETTE.white,
] as ColorTuple;

// ORDER matters for positioning in quick picker
export const DEFAULT_ELEMENT_BACKGROUND_PICKS = [
  COLOR_PALETTE.transparent,
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX - 1],
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX],
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX + 1],
  COLOR_PALETTE.white,
] as ColorTuple;

// ORDER matters for positioning in quick picker
export const DEFAULT_CANVAS_BACKGROUND_PICKS = [
  COLOR_PALETTE.white,
  // radix slate2
  "#f8f9fa",
  // radix blue2
  "#f5faff",
  // radix yellow2
  "#fffce8",
  // radix bronze2
  "#fdf8f6",
] as ColorTuple;

// -----------------------------------------------------------------------------
// palette defaults
// -----------------------------------------------------------------------------

export const DEFAULT_ELEMENT_STROKE_COLOR_PALETTE = {
  // 1st row
  transparent: COLOR_PALETTE.transparent,
  white: COLOR_PALETTE.white,
  gray: COLOR_PALETTE.gray,
  black: COLOR_PALETTE.black,
  bronze: COLOR_PALETTE.bronze,
  // rest
  ...COMMON_ELEMENT_SHADES,
} as const;

// ORDER matters for positioning in pallete (5x3 grid)s
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE = {
  transparent: COLOR_PALETTE.transparent,
  white: COLOR_PALETTE.white,
  gray: COLOR_PALETTE.gray,
  black: COLOR_PALETTE.black,
  bronze: COLOR_PALETTE.bronze,

  ...COMMON_ELEMENT_SHADES,
} as const;

// -----------------------------------------------------------------------------
// helpers
// -----------------------------------------------------------------------------

// !!!MUST BE WITHOUT GRAY, TRANSPARENT AND BLACK!!!
export const getAllColorsSpecificShade = (index: 0 | 1 | 2 | 3 | 4) =>
  [
    // 2nd row
    COLOR_PALETTE.cyan[index],
    COLOR_PALETTE.blue[index],
    COLOR_PALETTE.violet[index],
    COLOR_PALETTE.grape[index],
    COLOR_PALETTE.pink[index],

    // 3rd row
    COLOR_PALETTE.green[index],
    COLOR_PALETTE.teal[index],
    COLOR_PALETTE.yellow[index],
    COLOR_PALETTE.orange[index],
    COLOR_PALETTE.red[index],
  ] as const;

export const rgbToHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

// -----------------------------------------------------------------------------
