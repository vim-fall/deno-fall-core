import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import type { SourceItem } from "./source.ts";

export type ActionItem = Omit<SourceItem, "label">;

export interface ActionParams {
  /**
   * The item under the cursor.
   */
  cursorItem?: ActionItem;

  /**
   * The items that are currently selected.
   */
  selectedItems: ActionItem[];

  /**
   * The items that are currently filtered.
   */
  filteredItems: ActionItem[];
}

/**
 * The action interface.
 *
 * Actions are responsible for processing selected items within the picker.
 * They are applied to either the selected items or the cursor item if no items are selected.
 *
 * Action developers must implement this interface and export the `getAction` function
 * from the module that satisfies the `ActionModule` interface.
 *
 * ```typescript
 * import type { Action } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 * import * as fn from "https://deno.land/x/denops_std/function/mod.ts";
 *
 * export function getAction(): Action {
 *   return {
 *     invoke: async (denops, { cursorItem }) => {
 *       if (cursorItem == undefined) {
 *         return false;
 *       }
 *       // Open the cursorItem.value with `vsplit`
 *       try {
 *         const path = await fn.fnameescape(denops, cursorItem.value);
 *         await denops.cmd(`vsplit ${path}`);
 *       } catch {
 *         // Fail silently to avoid interrupting the user's operation
 *       }
 *       return false;
 *     },
 *   };
 * }
 * ```
 */
export interface Action {
  /**
   * Invoke the action on the specified items.
   *
   * This method is called when the user triggers the action.
   * It should return `true` if the picker needs to continue running.
   *
   * @param denops The Denops instance.
   * @param params The action parameters.
   * @returns `true` if the picker needs to continue running.
   */
  invoke: (
    denops: Denops,
    params: ActionParams,
  ) => Promish<boolean>;
}

export interface ActionModule {
  /**
   * Get the action instance.
   *
   * This method is called during action registration.
   *
   * @param options The options provided during registration.
   */
  getAction: (options: Record<string, unknown>) => Promish<Action>;
}

/**
 * Check if the value conforms to the `ActionItem` interface.
 */
export const isActionItem: Predicate<ActionItem> = is.ObjectOf({
  value: is.String,
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
});
