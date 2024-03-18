import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

/**
 * The filter interface.
 *
 * The Filter is responsible for filtering items in the picker.
 * It is applied to all items, so it should be efficient.
 *
 * Filter developers must implement this interface and export the `getFilter` function
 * from the module that satisfies the `FilterModule` interface.
 *
 * ```typescript
 * import type { Filter } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getFilter(): Filter {
 *   return {
 *     getStream: (denops, query, { signal }) => {
 *       if (signal?.aborted) return undefined;
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
 * }
 * ```
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
   * If the method returns `undefined`, no filter is applied.
   *
   * @param denops The Denops instance.
   * @param query The query used to filter the items.
   * @param options.signal The signal to abort the filter.
   */
  getStream: (
    denops: Denops,
    query: string,
    options: { signal?: AbortSignal },
  ) => Promish<TransformStream<Item, Item> | undefined>;
}

export interface FilterModule {
  /**
   * Get the filter instance.
   *
   * This method is called during filter registration.
   *
   * @param options The options provided during registration.
   */
  getFilter: (options: Record<string, unknown>) => Filter;
}

export type { Item };
