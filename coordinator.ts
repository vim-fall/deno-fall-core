import type { Border, Theme } from "./theme.ts";

/**
 * Represents the width and height dimensions.
 */
export type Size = {
  width: number;
  height: number;
};

/**
 * Dimension: size with position (col, row).
 */
export type Dimension = Size & {
  col: number;
  row: number;
};

/**
 * Styles for the picker components.
 */
export type Style = {
  /**
   * The border style for the input component.
   */
  input: Border;
  /**
   * The border style for the list component.
   */
  list: Border;
  /**
   * The border style for the preview component, if applicable.
   */
  preview?: Border;
};

/**
 * Layout for the picker components.
 */
export type Layout = {
  /**
   * Dimensions of the input component.
   */
  input: Dimension;
  /**
   * Dimensions of the list component.
   */
  list: Dimension;
  /**
   * Dimensions of the preview component, if applicable.
   */
  preview?: Dimension;
};

/**
 * Coordinator for managing the layout and style of picker components.
 */
export type Coordinator = {
  /**
   * Retrieves the style for the picker components.
   *
   * @param theme - The theme used to style the components.
   * @returns The style configuration for the picker components.
   */
  style(theme: Theme): Style;

  /**
   * Determines the layout for the picker components based on screen size.
   *
   * @param screen - The size of the screen.
   * @returns The layout configuration for the picker components.
   */
  layout(screen: Size): Layout;
};
