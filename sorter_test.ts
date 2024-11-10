import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { UnitDetail } from "./item.ts";
import type { Sorter, SortParams } from "./sorter.ts";

Deno.test("Sorter", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Sorter, Sorter<UnitDetail>>>(true);
  });

  await t.step("sort follows the type constraint", () => {
    const sorter: Sorter<{ a: string }> = { sort: () => {} };
    sorter.sort(denops, {} as SortParams<{ a: string }>, {});
    sorter.sort(denops, {} as SortParams<{ a: string; b: string }>, {});
    // @ts-expect-error: 'a' is missing
    sorter.sort(denops, {} as SortParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    sorter.sort(denops, {} as SortParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    sorter.sort(denops, {} as SortParams<UnitDetail>, {});
  });
});
