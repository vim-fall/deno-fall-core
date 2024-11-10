import type { Denops } from "@denops/std";

import type { Promish } from "./_typeutil.ts";
import type { Detail, IdItem } from "./item.ts";

/**
 * Parameters for invoking an action.
 */
export type InvokeParams<T extends Detail> = {
  /**
   * The item currently under the cursor.
   *
   * If `filteredItems` is empty, this will be `undefined`.
   */
  readonly item?: IdItem<T> | undefined;
  /**
   * The items selected by the user.
   *
   * If no items were selected, this will be `undefined`.
   */
  readonly selectedItems?: readonly IdItem<T>[] | undefined;
  /**
   * The items after filtering.
   */
  readonly filteredItems: readonly IdItem<T>[];
};

/**
 * An action that can be invoked from the picker.
 */
export type Action<T extends Detail> = {
  /**
   * Invoke the action.
   *
   * @param denops - The Denops instance.
   * @param params - Parameters for the action invocation.
   * @param options - Additional options.
   * @returns If the picker should remain open, return `true`.
   */
  invoke(
    denops: Denops,
    params: InvokeParams<T>,
    options: { signal?: AbortSignal },
  ): Promish<void | true>;
};
