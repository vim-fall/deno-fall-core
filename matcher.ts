import type { Denops } from "@denops/std";

import type { Detail, DetailUnit, IdItem } from "./item.ts";

/**
 * Parameters for matching items.
 */
export type MatchParams<T extends Detail> = {
  /**
   * User input query for filtering.
   */
  readonly query: string;
  /**
   * Array of items to match against the query.
   */
  readonly items: readonly IdItem<T>[];
};

/**
 * Matcher that filters items based on user input.
 */
export type Matcher<T extends Detail = DetailUnit> = {
  __phantom?: (_: T) => void; // This is required for type constraint.

  /**
   * Matches items against the provided query.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters for matching items.
   * @param options - Additional options, including an abort signal.
   * @returns An async iterator over matched `IdItem` elements.
   */
  match<V extends T>(
    denops: Denops,
    params: MatchParams<V>,
    options: { signal?: AbortSignal },
  ): AsyncIterableIterator<IdItem<V>>;
};
