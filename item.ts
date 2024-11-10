/**
 * A detail attribute base type.
 */
export type Detail = Record<PropertyKey, unknown>;

/**
 * An unit of Detail.
 */
export type UnitDetail = Record<never, never>;

/**
 * An item processed by the picker.
 */
export type IdItem<T extends Detail> = {
  /**
   * Unique identifier for the item.
   */
  readonly id: unknown;

  /**
   * Item's primary value.
   */
  readonly value: string;

  /**
   * Detailed information about the item.
   *
   * Used for further processing.
   */
  readonly detail: T;

  /**
   * Display label for the item in the picker.
   *
   * If not specified, `value` is used as the label.
   */
  label?: string;

  /**
   * Decorations applied to the item's line in the picker.
   *
   * These decorations highlight matched parts or improve visualization.
   * Developers should respect and extend existing `decorations`.
   *
   * Note: If `highlight` is unspecified, the picker uses a default highlight
   * group to emphasize matched parts.
   */
  decorations?: readonly ItemDecoration[];
};

/**
 * An item displayed in the picker.
 */
export type DisplayItem<T extends Detail> = IdItem<T> & {
  /**
   * Display label for the item in the picker.
   *
   * If unspecified, `value` is used as the label.
   */
  label: string;

  /**
   * Decorations applied to the item's line in the picker.
   *
   * These decorations highlight matched parts or improve visualization.
   * Developers should respect and extend existing `decorations`.
   *
   * Note: If `highlight` is unspecified, the picker uses a default highlight
   * group to emphasize matched parts.
   */
  decorations: readonly ItemDecoration[];
};

/**
 * An item used for previewing content in the picker.
 */
export type PreviewItem = {
  /**
   * Content to preview.
   */
  readonly content: string[];
  /**
   * Line number to jump to.
   */
  readonly line?: number;
  /**
   * Column number to jump to.
   */
  readonly column?: number;
  /**
   * Filetype for syntax highlighting.
   */
  readonly filetype?: string;
  /**
   * Filename displayed in the buffer name.
   */
  readonly filename?: string;
};

/**
 * Decoration applied to an item's line in the picker.
 */
export type ItemDecoration = {
  /**
   * Column number (in bytes).
   */
  readonly column: number;
  /**
   * Length of the decoration (in bytes).
   */
  readonly length: number;
  /**
   * Name of the highlight group.
   */
  readonly highlight?: string;
};
