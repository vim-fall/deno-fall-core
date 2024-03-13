import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { Promish } from "./_common.ts";

export interface SourceItem {
  /**
   * The value of the item.
   */
  value: string;

  /**
   * The display label of the item.
   *
   * This label is used to display the item in the picker.
   * If not specified, `value` is used.
   */
  label?: string;

  /**
   * The detailed information of the item.
   *
   * This information is used in further processing, such as `Filter`, `Processor`, `Renderer`, `Previewer`, and `Action`.
   * Developers should verify if the `detail` has the expected structure before using it and ignore the item if it does not.
   */
  detail?: Record<string, unknown>;
}

/**
 * The source interface.
 *
 * The Source is a provider of items for the picker.
 *
 * Source developers must implement this interface and export the `getSource` function
 * from the module that satisfies the `SourceModule` interface.
 *
 * ```typescript
 * import type { Source } from "https://deno.land/x/fall_core@$MODULE_VERSION/mod.ts";
 *
 * export function getSource(): Source {
 *   return {
 *     getStream: (denops, ...args) => {
 *       // Return a static list of items as a ReadableStream
 *       return ReadableStream.from([
 *         { value: "item1" },
 *         { value: "item2" },
 *         { value: "item3" },
 *       ]);
 *     },
 *   };
 * }
 * ```
 */
export interface Source {
  /**
   * Get the stream of items.
   *
   * This method is called when the picker is started.
   * The returned stream is used to retrieve items in the background.
   * If the method returns `undefined`, the picker is canceled.
   *
   * @param denops The Denops instance.
   * @param args The arguments passed to the picker.
   */
  getStream: (
    denops: Denops,
    ...args: string[]
  ) => Promish<ReadableStream<SourceItem> | undefined>;

  /**
   * Get the completion candidates.
   *
   * This method is called when the user try to complete source arguments.
   *
   * @param denops The Denops instance.
   * @param arglead The leading string of the argument.
   * @param cmdline The whole command line.
   * @param cursorpos The cursor position in the command line.
   */
  getCompletion?: (
    denops: Denops,
    arglead: string,
    cmdline: string,
    cursorpos: number,
  ) => Promish<string[]>;
}

export interface SourceModule {
  /**
   * Get the source instance.
   *
   * This method is called during source registration.
   *
   * @param options The options provided during registration.
   */
  getSource: (options: Record<string, unknown>) => Source;
}
