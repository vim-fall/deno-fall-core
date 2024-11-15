import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { DetailUnit } from "./item.ts";
import type { RefineParams, Refiner } from "./refiner.ts";

Deno.test("Refiner", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Refiner, Refiner<DetailUnit>>>(true);
  });

  await t.step("preview follows the type constraint", () => {
    const previewer: Refiner<{ a: string }> = { refine: async function* () {} };
    previewer.refine(denops, {} as RefineParams<{ a: string }>, {});
    previewer.refine(
      denops,
      {} as RefineParams<{ a: string; b: string }>,
      {},
    );
    // @ts-expect-error: 'a' is missing
    previewer.refine(denops, {} as RefineParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    previewer.refine(denops, {} as RefineParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    previewer.refine(denops, {} as RefineParams<DetailUnit>, {});
  });
});
