import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";
import {
  is,
  type Predicate,
} from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

import type { Promish } from "./_common.ts";
import type { SourceItem } from "./source.ts";

export type ActionItem = Omit<SourceItem, "label">;

export interface Action {
  /**
   * Invoke the action on the specified items.
   *
   * This method is called when the user triggers the action.
   * It should return `true` if the picker needs to continue running.
   *
   * @param denops The Denops instance.
   * @param items The items to be processed.
   * @returns `true` if the picker needs to continue running.
   */
  invoke: (
    denops: Denops,
    items: ActionItem[],
  ) => Promish<boolean>;
}

export interface ActionModule {
  /**
   * Retrieve the action instance.
   *
   * This method is called during action registration.
   *
   * @param options The options provided during registration.
   */
  getAction: (options: Record<string, unknown>) => Promish<Action>;
}

/**
 * Check if the value satisfies the `ActionItem` interface.
 */
export const isActionItem: Predicate<ActionItem> = is.ObjectOf({
  value: is.String,
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
});
