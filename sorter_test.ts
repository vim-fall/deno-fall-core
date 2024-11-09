import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { Promish } from "./_typeutil.ts";
import type { Sorter, SortParams } from "./sorter.ts";

Deno.test("Sorter", async (t) => {
  const denops = new DenopsStub();
  const sorter: Sorter<{ a: string }> = {
    sort: () => {},
  };

  await t.step("passed type is equal to the type restriction", () => {
    const items = sorter.sort(
      denops,
      {} as SortParams<{ a: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void>
      >
    >(true);
  });

  await t.step("passed type establishes the type restriction", () => {
    const items = sorter.sort(
      denops,
      {} as SortParams<{ a: string; b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void>
      >
    >(true);
  });

  await t.step("passed type does not establish the type restriction", () => {
    const items = sorter.sort(
      denops,
      // @ts-expect-error: 'a' is missing
      {} as SortParams<{ b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void>
      >
    >(true);
  });
});
