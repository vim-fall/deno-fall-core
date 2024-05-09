import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

export type PreviewerItem = Pick<Item, "value" | "detail">;

/**
 * The previewer interface.
 *
 * The Previewer is responsible for previewing items within the picker.
 * Because Vim's popup window does not support opening ordinal buffers, the previewer must
 * rewrite the buffer content with the given `bufnr` or `winid`.
 *
 * Previewer developers must implement this interface and export the `getPreviewer` function
 * from the module that satisfies the `PreviewerModule` interface.
 *
 * ```typescript
 * import type { Previewer } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 * import * as buffer from "https://deno.land/x/denops_std/buffer/mod.ts";
 *
 * export function getPreviewer(): Previewer {
 *   return {
 *     preview: async (denops, item, { bufnr }, { signal }) => {
 *       if (signal?.aborted) return;
 *       // Write the file content of the item.value to the buffer
 *       try {
 *         const content = await Deno.readTextFile(item.value);
 *         if (signal?.aborted) return;
 *         await buffer.replace(denops, bufnr, content.split("\n"));
 *       } catch {
 *         // Fail silently to avoid interrupting the user's operation
 *       }
 *     },
 *   };
 * }
 * ```
 */
export interface Previewer {
  /**
   * Description of the previewer.
   */
  readonly description?: string;

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
   * @param options.signal The signal to abort the preview.
   * @return `true` if the previewer need to try next previewer.
   */
  preview: (
    denops: Denops,
    item: PreviewerItem,
    target: {
      bufnr: number;
      winid: number;
    },
    options: { signal?: AbortSignal },
  ) => Promish<void | boolean>;
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
