/**
 * Theme interface, defining the border and divider characters.
 */
export type Theme = {
  /**
   * Characters used for the border.
   */
  border: Border;
  /**
   * Characters used for dividers.
   */
  divider: Divider;
};

/**
 * Index mapping for border positions.
 */
export const BorderIndex = {
  TopLeft: 0,
  Top: 1,
  TopRight: 2,
  Right: 3,
  BottomRight: 4,
  Bottom: 5,
  BottomLeft: 6,
  Left: 7,
} as const;

export type BorderIndex = typeof BorderIndex[keyof typeof BorderIndex];

/**
 * Characters used to create borders.
 */
export type Border = readonly [
  topleft: string,
  top: string,
  topright: string,
  right: string,
  botright: string,
  bottom: string,
  botleft: string,
  left: string,
];

/**
 * Index mapping for divider positions.
 */
export const DividerIndex = {
  Left: 0,
  Horizontal: 1,
  Right: 2,
  Top: 3,
  Vertical: 4,
  Bottom: 5,
} as const;

export type DividerIndex = typeof DividerIndex[keyof typeof DividerIndex];

/**
 * Characters used to create dividers.
 */
export type Divider = readonly [
  left: string,
  horizontal: string,
  right: string,
  top: string,
  vertical: string,
  bottom: string,
];
