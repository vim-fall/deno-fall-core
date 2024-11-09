import type { Denops } from "@denops/std";

import type { Promish } from "./_typeutil.ts";
import type { IdItem, PreviewItem } from "./item.ts";

export type PreviewParams<T> = {
  /**
   * The item to preview.
   */
  readonly item: IdItem<T>;
};

export type Previewer<T> = {
  /**
   * Preview an item.
   *
   * @param denops The Denops instance.
   * @param params The parameters to preview an item.
   * @param options The options for previewing.
   */
  preview(
    denops: Denops,
    params: PreviewParams<T>,
    options: { signal?: AbortSignal },
  ): Promish<void | PreviewItem>;
};
