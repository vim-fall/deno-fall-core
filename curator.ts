import type { Denops } from "@denops/std";

import type { Detail, IdItem } from "./item.ts";

/**
 * Parameters for curating items.
 */
export type CurateParams = {
  /**
   * Arguments passed to the picker.
   */
  readonly args: readonly string[];
  /**
   * User input query for filtering items.
   */
  readonly query: string;
};

/**
 * Curator that collects and filters items based on user input.
 *
 * Acts as an interactive `Source`.
 */
export type Curator<T extends Detail> = {
  /**
   * Curates items based on the provided parameters.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters for curating items.
   * @param options - Optional settings, including an abort signal.
   * @returns An async iterator over curated `IdItem` elements.
   */
  curate(
    denops: Denops,
    params: CurateParams,
    options: { signal?: AbortSignal },
  ): AsyncIterableIterator<IdItem<T>>;
};
