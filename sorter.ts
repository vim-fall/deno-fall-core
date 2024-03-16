import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

/**
 * The sorter interface.
 *
 * The Sorter is responsible for sorting the items in the picker.
 *
 * Sorter developers must implement this interface and export the `getSorter` function
 * from the module that satisfies the `SorterModule` interface.
 *
 * ```typescript
 * import type { Sorter } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getSorter(): Sorter {
 *   return {
 *     sort: (_denops, items, { signal }) => {
 *       if (signal?.aborted) return items;
 *       // Sort items in lexicographical order in-place
 *       items.sort((a, b) => a.value.localeCompare(b.value));
 *       return items;
 *     },
 *   };
 * }
 * ```
 */
export interface Sorter {
  /**
   * Sort the items for the picker.
   *
   * This method is called when the picker filtered the items on the selector.
   * Note that all filtered items are passed to the method.
   *
   * @param denops The Denops instance.
   * @param items The items to be sorted.
   * @param options.signal The signal to abort the sorting.
   */
  sort: (
    denops: Denops,
    items: Item[],
    options: { signal?: AbortSignal },
  ) => Promish<Item[]>;
}

export interface SorterModule {
  /**
   * Get the sorter instance.
   *
   * This method is called during sorter registration.
   *
   * @param options The options provided during registration.
   */
  getSorter: (options: Record<string, unknown>) => Sorter;
}
