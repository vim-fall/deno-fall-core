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

  await t.step(
    "check if the type constraint correctly triggers the type checking",
    () => {
      const sorter1: Sorter<{ a: string }> = {
        sort: () => {},
      };
      const sorter2: Sorter<{ b: string }> = {
        sort: () => {},
      };
      const sorter3: Sorter<{ c: string }> = {
        sort: () => {},
      };
      function strictFunction<T extends { a: string }>(_: Sorter<T>) {}
      strictFunction(sorter1);
      // @ts-expect-error: 'a' is missing
      strictFunction(sorter2);
      // @ts-expect-error: 'a' is missing
      strictFunction(sorter3);
    },
  );
});
