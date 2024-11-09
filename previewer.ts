import type { Denops } from "@denops/std";

import type { FlatType, Promish } from "./_typeutil.ts";
import type { IdItem, PreviewItem } from "./item.ts";

/**
 * Parameters for previewing an item.
 */
export type PreviewParams<T> = {
  /**
   * The item to preview.
   */
  readonly item: IdItem<FlatType<T>>;
};

/**
 * Previewer that generates a preview for an item.
 */
export type Previewer<T> = {
  /**
   * Generates a preview for the specified item.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters specifying the item to preview.
   * @param options - Additional options, including an abort signal.
   * @returns A `PreviewItem` or `void` if no preview is available.
   */
  preview(
    denops: Denops,
    params: PreviewParams<FlatType<T>>,
    options: { signal?: AbortSignal },
  ): Promish<void | PreviewItem>;
};
