import type { Denops } from "@denops/std";

import type { FlatType, Promish } from "./_typeutil.ts";
import type { IdItem } from "./item.ts";

/**
 * Parameters for sorting items.
 */
export type SortParams<T> = {
  /**
   * Array of items to sort.
   */
  readonly items: IdItem<FlatType<T>>[];
};

/**
 * Sorter that arranges items in order.
 */
export type Sorter<T> = {
  /**
   * Sorts items in place.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters specifying the items to sort.
   * @param options - Options, including an abort signal.
   * @returns Resolves when sorting is complete.
   */
  sort(
    denops: Denops,
    params: SortParams<FlatType<T>>,
    options: { signal?: AbortSignal },
  ): Promish<void>;
};
