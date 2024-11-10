import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { IdItem } from "./item.ts";
import type { Curator } from "./curator.ts";

Deno.test("Curator", () => {
  const denops = new DenopsStub();
  const curator: Curator<{ a: string }> = {
    curate: async function* () {},
  };
  const items = curator.curate(denops, { args: [], query: "" }, {});
  assertType<
    IsExact<
      typeof items,
      AsyncIterableIterator<IdItem<{ a: string }>>
    >
  >(true);
});
