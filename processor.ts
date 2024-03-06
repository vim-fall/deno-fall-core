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

export interface ProcessorItem extends SourceItem {
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
   * These decorations highlight the matched part of the item, or are used for better visualization.
   * Processor developers should respect existing `decorations` and extend them.
   *
   * Note: If `highlight` is not specified, the picker will use the default highlight group
   * for highlighting the matched part.
   */
  decorations: ItemDecoration[];
}

/**
 * The processor interface.
 *
 * The Processor is responsible for processing items within the picker.
 * It is designed to filter, sort, and modify items.
 * It is applied to all items, so it should be efficient.
 *
 * Processor developers must implement this interface and export the `getProcessor` function
 * from the module that satisfies the `ProcessorModule` interface.
 *
 * For example, if you'd like to filter items by the query, you can implement the processor as follows:
 *
 * ```typescript
 * import type { Processor } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getProcessor(): Processor {
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
 *
 * Or if you want to sort the items by the value, you can implement the processor as follows:
 *
 * ```typescript
 * import type { Processor, ProcessorItem } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getProcessor(): Processor {
 *   return {
 *     getStream: (denops, _query) => {
 *       // Sort the items in lexicographical order
 *       const items: ProcessorItem[] = [];
 *       return new TransformStream({
 *         transform(chunk) {
 *           items.push(chunk);
 *         },
 *         flush(controller) {
 *           items.sort((a, b) => a.value.localeCompare(b.value));
 *           for (const item of items) {
 *             controller.enqueue(item);
 *           }
 *         },
 *       });
 *     },
 *   };
 * }
 * ```
 */
export interface Processor {
  /**
   * Get the transform stream to process the items.
   *
   * This method is invoked when the user types the query in the picker.
   * The stream may be frequently canceled and recreated when the query changes.
   * If the method returns `undefined`, no processing is applied.
   *
   * @param denops The Denops instance.
   * @param query The query used to process the items.
   */
  getStream: (
    denops: Denops,
    query: string,
  ) => Promish<TransformStream<ProcessorItem, ProcessorItem> | undefined>;
}

export interface ProcessorModule {
  /**
   * Get the processor instance.
   *
   * This method is called during processor registration.
   *
   * @param options The options provided during registration.
   */
  getProcessor: (options: Record<string, unknown>) => Processor;
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
 * Check if the value conforms to the `ProcessorItem` interface.
 */
export const isProcessorItem: Predicate<ProcessorItem> = is.ObjectOf({
  id: is.Unknown,
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
  decorations: is.ArrayOf(isItemDecoration),
});
