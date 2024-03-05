import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import type { FilterItem } from "./filter.ts";

export type PreviewerItem = Pick<FilterItem, "value" | "detail">;

export interface Previewer {
  /**
   * Preview the item on the specified buffer or window.
   *
   * This method is called when the picker attempts to preview the item.
   * Note that the picker invokes this method with debouncing to avoid flickering.
   * Therefore, the method may not be called for every item.
   *
   * @param denops The Denops instance.
   * @param item The item to be previewed.
   * @param target.bufnr The buffer number for previewing the item.
   * @param target.winid The window ID for previewing the item.
   */
  preview: (
    denops: Denops,
    item: PreviewerItem,
    target: {
      bufnr: number;
      winid: number;
    },
  ) => Promish<void>;
}

export interface PreviewerModule {
  /**
   * Get the previewer instance.
   *
   * This method is called during previewer registration.
   *
   * @param options The options provided during registration.
   */
  getPreviewer: (options: Record<string, unknown>) => Previewer;
}

/**
 * Check if the value conforms to the `PreviewerItem` interface.
 */
export const isPreviewerItem: Predicate<PreviewerItem> = is.ObjectOf({
  value: is.String,
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
});
