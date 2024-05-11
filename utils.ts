import type { Denops } from "https://deno.land/x/denops_std@v6.4.2/mod.ts";
import { ensure, is } from "jsr:@core/unknownutil@3.18.0";

/**
 * Get byte length of string to calculate columns for Vim
 */
export async function getByteLength(
  denops: Denops,
  s: string,
): Promise<number> {
  return ensure(
    await denops.dispatch("fall", "util:getByteLength", s),
    is.Number,
  );
}
