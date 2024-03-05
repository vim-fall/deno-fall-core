import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import { type FilterItem, isItemDecoration } from "./filter.ts";

export type RendererItem = Omit<FilterItem, "id">;

/**
 * The renderer interface.
 *
 * The Renderer is responsible for rendering the items in the selector window of the picker.
 *
 * It is only applied to the visible items on the selector for performance reasons. This is different
 * from the Processor, which is applied to all filtered items.
 * For example, if you want to add NerdFont icons to the items, that modification is not necessary on
 * invisible items, so you should use the renderer instead of the Processor.
 *
 * Renderer developers must implement this interface and export the `getRenderer` function
 * from the module that satisfies the `RendererModule` interface.
 *
 * ```typescript
 * import type { Renderer } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getRenderer(): Renderer {
 *   return {
 *     render: (denops, items) => {
 *       // Use UPPER CASE for the label
 *       return items.map((v) => ({
 *         ...v,
 *         label: (v.label ?? v.value).toUpperCase(),
 *       }));
 *     },
 *   };
 * }
 * ```
 */
export interface Renderer {
  /**
   * Render the items for the picker.
   *
   * This method is called when the picker displays the items on the selector.
   * Note that only visible items are passed to the method.
   *
   * @param denops The Denops instance.
   * @param items The items to be displayed.
   */
  render: (
    denops: Denops,
    items: RendererItem[],
  ) => Promish<RendererItem[]>;
}

export interface RendererModule {
  /**
   * Get the renderer instance.
   *
   * This method is called during renderer registration.
   *
   * @param options The options provided during registration.
   */
  getRenderer: (options: Record<string, unknown>) => Renderer;
}

/**
 * Check if the value satisfies the `RendererItem` interface.
 */
export const isRendererItem: Predicate<RendererItem> = is.ObjectOf({
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
  decorations: is.ArrayOf(isItemDecoration),
});
