import type { Denops } from "@denops/std";
import type { Promish } from "./_typeutil.ts";
import type { Detail, IdItem, PreviewItem } from "./item.ts";

/**
 * Parameters for previewing an item.
 */
export type PreviewParams<T extends Detail> = {
  /**
   * The item to preview.
   */
  readonly item: IdItem<T>;
};

/**
 * Previewer that generates a preview for an item.
 */
export type Previewer<T extends Detail> = {
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
    params: PreviewParams<T>,
    options: { signal?: AbortSignal },
  ): Promish<void | PreviewItem>;
};
