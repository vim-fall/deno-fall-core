import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { IdItem } from "./item.ts";
import type { Source } from "./source.ts";

Deno.test("Source", () => {
  const denops = new DenopsStub();
  const source: Source<{ a: string }> = {
    collect: async function* () {},
  };
  const items = source.collect(denops, { args: [] }, {});
  assertType<
    IsExact<
      typeof items,
      AsyncIterableIterator<IdItem<{ a: string }>>
    >
  >(true);
});
