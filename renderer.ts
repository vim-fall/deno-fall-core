import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import { type FilterItem, isItemDecoration } from "./filter.ts";

export type RendererItem = Omit<FilterItem, "id">;

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
 * Check if the value conforms to the `RendererItem` interface.
 */
export const isRendererItem: Predicate<RendererItem> = is.ObjectOf({
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
  decorations: is.ArrayOf(isItemDecoration),
});
