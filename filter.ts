/**
 * Extension developers must implement and export `getFilter` function to create an extension.
 *
 * ```typescript
 * import type { GetFilter } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export const getFilter: GetFilter = (_denops, _options) => {
 *   return {
 *     stream({ query }, { signal }) {
 *       if (signal?.aborted) return undefined;
 *
 *       // Return the transform stream to filter the items
 *       return new TransformStream({
 *         async transform(chunk, controller) {
 *           if (chunk.value.includes(query)) {
 *             controller.enqueue(chunk);
 *           }
 *         },
 *       });
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

export interface FilterParams {
  /**
   * The query that user has input.
   */
  query: string;
}

/**
 * Filter is responsible for filtering items in the picker.
 *
 * The filter is applied to the stream of the items.
 */
export interface Filter {
  /**
   * Description of the filter.
   */
  readonly description?: string;

  /**
   * Get the transform stream to filter the items.
   *
   * This method is invoked when the user types the query in the picker.
   * The stream may be frequently canceled and recreated when the query changes.
   * If the method returns `undefined`, this filter won't be applied.
   *
   * @param params The filter parameters.
   * @param options.signal The signal to abort the filter.
   */
  stream: (
    params: FilterParams,
    options: { signal?: AbortSignal },
  ) => Promish<TransformStream<Item, Item> | undefined>;
}

/**
 * Get the filter instance.
 *
 * This function is called when the picker is started.
 *
 * @param denops The Denops instance.
 * @param options The options of the extension.
 */
export type GetFilter = (
  denops: Denops,
  options: Record<string, unknown>,
) => Promish<Filter>;
