import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import type { Decoration } from "https://deno.land/x/denops_std@v6.3.0/buffer/decoration.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import type { SourceItem } from "./source.ts";

export type ItemDecoration =
  & Omit<Decoration, "line" | "highlight">
  & Partial<Pick<Decoration, "highlight">>;

export interface FilterItem extends SourceItem {
  /**
   * Unique identifier of the item provided by the picker.
   *
   * This identifier distinguishes the item in the picker.
   * Developers must preserve this value as-is.
   */
  id: unknown;

  /**
   * Decorations to be applied to the line of the item in the picker.
   *
   * These decorations highlight the matched part of the item.
   * Filter developers should respect existing `decorations` and extend them.
   *
   * Note: If `highlight` is not specified, the picker will use the default highlight group
   * for highlighting the matched part.
   */
  decorations: ItemDecoration[];
}

/**
 * The filter interface.
 *
 * The Filter is responsible for filtering items within the picker.
 * It is applied to all items and is used to filter items based on the query.
 *
 * Filter developers must implement this interface and export the `getFilter` function
 * from the module that satisfies the `FilterModule` interface.
 *
 * ```typescript
 * import type { Filter } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getFilter(): Filter {
 *   return {
 *     getStream: (denops, query) => {
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
   * Get the transform stream to filter the items.
   *
   * This method is invoked when the user types the query in the picker.
   * The stream may be frequently canceled and recreated when the query changes.
   * If the method returns `undefined`, no filtering is applied.
   *
   * @param denops The Denops instance.
   * @param query The query used to filter the items.
   */
  getStream: (
    denops: Denops,
    query: string,
  ) => Promish<TransformStream<FilterItem, FilterItem> | undefined>;
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

/**
 * Check if the value conforms to the `ItemDecoration` interface.
 */
export const isItemDecoration: Predicate<ItemDecoration> = is.ObjectOf({
  text: is.String,
  column: is.Number,
  length: is.Number,
  highlight: is.OptionalOf(is.String),
});

/**
 * Check if the value conforms to the `FilterItem` interface.
 */
export const isFilterItem: Predicate<FilterItem> = is.ObjectOf({
  id: is.Unknown,
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
  decorations: is.ArrayOf(isItemDecoration),
});
