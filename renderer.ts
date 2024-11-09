import type { Denops } from "@denops/std";
import type { Promish } from "./_typeutil.ts";
import type { DisplayItem } from "./item.ts";

/**
 * Parameters for rendering items.
 */
export type RenderParams<T> = {
  /**
   * Array of items to render.
   */
  readonly items: DisplayItem<T>[];
};

/**
 * Renderer responsible for rendering items.
 */
export type Renderer<T> = {
  /**
   * Renders items in place.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters specifying the items to render.
   * @param options - Additional options, including an abort signal.
   * @returns Resolves when rendering is complete.
   */
  render(
    denops: Denops,
    params: RenderParams<T>,
    options: { signal?: AbortSignal },
  ): Promish<void>;
};
