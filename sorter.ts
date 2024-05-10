/**
 * Extension developers must implement and export `getSorter` function to create an extension.
 *
 * ```typescript
 * import type { GetSorter } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export const getSorter: GetSorter = (_denops, _options) => {
 *   return {
 *     sort({ items }, { signal }) {
 *       if (signal?.aborted) return items;
 *
 *       // Sort items in lexicographical order in-place
 *       return items.toSorted((a, b) => a.value.localeCompare(b.value));
 *     },
 *   };
 * };
 * ```
 * @module
 */
import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

export type { Item };

export interface SorterParams {
  /**
   * The query that user has input.
   */
  query: string;

  /**
   * The filtered items.
   */
  items: Item[];
}

/**
 * Sorter is responsible for sorting the items in the picker.
 *
 * The sorter is applied to the filtered items.
 */
export interface Sorter {
  /**
   * Description of the extension.
   */
  readonly description?: string;

  /**
   * Sort the items for the picker.
   *
   * This method is called when the picker filtered the items on the selector.
   * Note that all filtered items are passed to the method.
   *
   * @param params The sorter parameters.
   * @param options.signal The signal to abort the sorting.
   */
  sort: (
    params: SorterParams,
    options: { signal?: AbortSignal },
  ) => Promish<Item[]>;
}

/**
 * Get the sorter instance.
 *
 * This function is called when the picker is started.
 *
 * @param denops The Denops instance.
 * @param options The options of the extension.
 */
export type GetSorter = (
  denops: Denops,
  options: Record<string, unknown>,
) => Promish<Sorter>;
