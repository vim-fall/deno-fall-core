import type { Denops } from "@denops/std";

import type { FlatType } from "./_typeutil.ts";
import type { IdItem } from "./item.ts";

/**
 * Parameters for projecting items.
 */
export type ProjectParams<T> = {
  /**
   * Async iterable of items to project.
   */
  readonly items: AsyncIterable<IdItem<FlatType<T>>>;
};

/**
 * Projector that processes items from the source or curator.
 *
 * Generally, the projector has the following two roles:
 *
 * 1. Filter items from the source or curator based on criteria other than user input (Filter)
 * 2. Transform items from the source or curator to adapt the item type for further processing (Modifier)
 *
 * In built-in extensions, projectors are categorized into the two types above.
 */
export type Projector<T, U = FlatType<T>> = {
  /**
   * Projects items for further processing.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters specifying the items to project.
   * @param options - Additional options, including an abort signal.
   * @returns An async iterator over the projected `IdItem` elements of type `U`.
   */
  project(
    denops: Denops,
    params: ProjectParams<FlatType<T>>,
    options: { signal?: AbortSignal },
  ): AsyncIterableIterator<IdItem<FlatType<U>>>;
};
