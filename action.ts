import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";
import type { Item } from "./item.ts";

export type ActionItem = Pick<Item, "value" | "detail">;

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
   * The items that processed (filtered, sorted, modified).
   */
  processedItems: ActionItem[];
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
 *     invoke: async (denops, { cursorItem }, { signal }) => {
 *       if (signal?.aborted) return;
 *       if (cursorItem == undefined) {
 *         return;
 *       }
 *       // Open the cursorItem.value with `vsplit`
 *       try {
 *         const path = await fn.fnameescape(denops, cursorItem.value);
 *         if (signal?.aborted) return;
 *         await denops.cmd(`vsplit ${path}`);
 *       } catch {
 *         // Fail silently to avoid interrupting the user's operation
 *       }
 *     },
 *   };
 * }
 * ```
 */
export interface Action {
  /**
   * Description of the action.
   */
  readonly description?: string;

  /**
   * Invoke the action on the specified items.
   *
   * This method is called when the user triggers the action.
   * It should return `true` if the picker needs to continue running.
   *
   * @param denops The Denops instance.
   * @param params The action parameters.
   * @param options.signal The signal to abort the action.
   * @returns `true` if the picker needs to continue running.
   */
  invoke: (
    denops: Denops,
    params: ActionParams,
    options: { signal?: AbortSignal },
  ) => Promish<boolean | void>;
}

export interface ActionModule {
  /**
   * Get the action instance.
   *
   * This method is called during action registration.
   *
   * @param options The options provided during registration.
   */
  getAction: (options: Record<string, unknown>) => Action;
}
