import type { Denops } from "https://deno.land/x/denops_std@v6.3.0/mod.ts";

import type { FlatType, Promish } from "./_common.ts";
import type { Item } from "./item.ts";

export type SourceItem = FlatType<
  & Pick<Item, "value" | "label">
  & Partial<Pick<Item, "detail">>
>;

export type SourceOptions = Record<string, unknown>;

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
 *     getStream: (denops, _cmdline, _options) => {
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
   * Description of the source.
   */
  readonly description?: string;

  /**
   * Get the stream of items.
   *
   * This method is called when the picker is started.
   * The returned stream is used to retrieve items in the background.
   * If the method returns `undefined`, the picker is canceled.
   *
   * @param denops The Denops instance.
   * @param cmdline The arguments passed to the picker.
   * @params options The options passed to the picker. It will overwrite the source options provided during registration.
   */
  getStream: (
    denops: Denops,
    cmdline: string,
    options: SourceOptions,
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
  getSource: (options: SourceOptions) => Source;
}
