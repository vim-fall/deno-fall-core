import type { Denops } from "@denops/std";

import type { Promish } from "./_typeutil.ts";
import type { IdItem } from "./item.ts";

export type SortParams<T> = {
  readonly items: IdItem<T>[];
};

export type Sorter<T> = {
  /**
   * Sort items.
   *
   * This method sorts items in place.
   *
   * @param denops The Denops instance.
   * @param params The parameters to sort an item.
   * @param options The options for sorting.
   * @param options.signal The signal to abort.
   */
  sort(
    denops: Denops,
    params: SortParams<T>,
    options: { signal?: AbortSignal },
  ): Promish<void>;
};
