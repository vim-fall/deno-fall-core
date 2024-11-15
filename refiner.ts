import type { Denops } from "@denops/std";
import type { Detail, DetailUnit, IdItem } from "./item.ts";

/**
 * Parameters for refining a source or curator.
 */
export type RefineParams<T extends Detail> = {
  readonly items: AsyncIterable<IdItem<T>>;
};

/**
 * Refiner that refine a source or curator.
 */
export type Refiner<
  T extends Detail = DetailUnit,
  U extends Detail = DetailUnit,
> = {
  __phantom?: (_: T) => void; // This is required for type constraint.

  /**
   * Refine a source or curator.
   *
   * @param denops Denops instance.
   * @param params Parameters for refining.
   * @param options - Additional options, including an abort signal.
   * @returns An async iterator over the collected or curated items.
   */
  refine: <V extends T>(
    denops: Denops,
    params: RefineParams<V>,
    options: { signal?: AbortSignal },
  ) => AsyncIterableIterator<IdItem<V & U>>;
};
