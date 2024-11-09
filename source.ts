import type { Denops } from "@denops/std";
import type { IdItem } from "./item.ts";

/**
 * Parameters for collecting items.
 */
export type CollectParams = {
  /**
   * Arguments passed to the picker.
   */
  readonly args: readonly string[];
};

/**
 * Source that collects items.
 */
export type Source<T> = {
  /**
   * Collects items.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters specifying the items to collect.
   * @param options - Additional options, including an abort signal.
   * @returns An async iterator over the collected items.
   */
  collect(
    denops: Denops,
    params: CollectParams,
    options: { signal?: AbortSignal },
  ): AsyncIterableIterator<IdItem<T>>;
};
