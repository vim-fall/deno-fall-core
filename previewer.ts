/**
 * Extension developers must implement and export `getPreviewer` function to create an extension.
 *
 * ```typescript
 * import type { GetPreviewer } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 * import * as buffer from "https://deno.land/x/denops_std/buffer/mod.ts";
 *
 * export const getPreviewer: GetPreviewer = (denops, _options) => {
 *   return {
 *     async preview({ item, bufnr }, { signal }) {
 *         const content = await Deno.readTextFile(item.value);
 *         signal?.throwIfAborted();
 *         await buffer.replace(denops, bufnr, content.split("\n"));
 *     },
 *   };
 * };
 * ```
 */
import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

export type PreviewerItem = Pick<Item, "value" | "detail">;

export interface PreviewerParams {
  /**
   * The item going to be previewd.
   */
  readonly item: PreviewerItem;

  /**
   * The buffer number for previewing the item.
   */
  readonly bufnr: number;

  /**
   * The window ID for previewing the item.
   */
  readonly winid: number;
}

/**
 * Previewer is responsible for previewing items within the picker.
 *
 * The previewer is applied to a cursor item.
 * The previewer must rewrite the buffer content of the given `bufnr` or `winid` because
 * Vim's popup window does not support opening original buffers.
 */
export interface Previewer {
  /**
   * Description of the extension.
   */
  readonly description?: string;

  /**
   * Preview the item on the specified buffer or window.
   *
   * This method is called when the picker attempts to preview the item.
   *
   * Note that the picker invokes this method with debouncing to avoid flickering.
   * Therefore, the method may not be called for every item.
   *
   * @param params The previewer parameters.
   * @param options.signal The signal to abort the preview.
   * @return `true` if the picker needs to try next previewer.
   */
  readonly preview: (
    params: PreviewerParams,
    options: { signal?: AbortSignal },
  ) => Promish<void | boolean>;
}

/**
 * Get the previewer instance.
 *
 * This function is called when the picker is started.
 *
 * @param denops The Denops instance.
 * @param options The options of the extension.
 */
export type GetPreviewer = (
  denops: Denops,
  options: Readonly<Record<string, unknown>>,
) => Promish<Previewer>;
