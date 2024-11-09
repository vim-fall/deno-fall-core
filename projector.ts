import type { Denops } from "@denops/std";

import type { IdItem } from "./item.ts";

export type ProjectParams<T> = {
  /**
   * Items to project.
   */
  readonly items: AsyncIterable<IdItem<T>>;
};

export type Projector<T, U = T> = {
  /**
   * Project items.
   *
   * @param denops Denops instance.
   * @param params Parameters to match items.
   * @param options Options.
   */
  project(
    denops: Denops,
    params: ProjectParams<T>,
    options: { signal?: AbortSignal },
  ): AsyncIterableIterator<IdItem<U>>;
};
