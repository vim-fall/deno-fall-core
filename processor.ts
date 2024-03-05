import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import {
  type FilterItem,
  isItemDecoration,
  type ItemDecoration,
} from "./filter.ts";

export interface ProcessorItem extends FilterItem {
  /**
   * Decorations to be applied to the line of the item in the picker.
   *
   * These decorations are used to annotate the label of the item.
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
 * The Processor is responsible for processing the items for the picker.
 *
 * It is applied to all filtered items. This is different from the Renderer, which is only applied
 * to the visible items. For example, if you want to sort the items by a specific order, you should
 * use the processor instead of the Renderer.
 *
 * Processor developers must implement this interface and export the `getProcessor` function
 * from the module that satisfies the `ProcessorModule` interface.
 *
 * ```typescript
 * import type { Processor, ProcessorItem } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getProcessor(): Processor {
 *   return {
 *     getStream: (denops) => {
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
   * This method is called when the user types the query in the picker.
   * The stream may be frequently canceled and recreated when the query changes.
   * If the method returns `undefined`, no processing is applied.
   *
   * @param denops The Denops instance.
   */
  getStream: (
    denops: Denops,
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
 * Check if the value conforms to the `ProcessorItem` interface.
 */
export const isProcessorItem: Predicate<ProcessorItem> = is.ObjectOf({
  id: is.Unknown,
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
  decorations: is.ArrayOf(isItemDecoration),
});
