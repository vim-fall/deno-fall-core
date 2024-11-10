import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { DetailUnit } from "./item.ts";
import type { Previewer, PreviewParams } from "./previewer.ts";

Deno.test("Previewer", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Previewer, Previewer<DetailUnit>>>(true);
  });

  await t.step("preview follows the type constraint", () => {
    const previewer: Previewer<{ a: string }> = { preview: () => {} };
    previewer.preview(denops, {} as PreviewParams<{ a: string }>, {});
    previewer.preview(
      denops,
      {} as PreviewParams<{ a: string; b: string }>,
      {},
    );
    // @ts-expect-error: 'a' is missing
    previewer.preview(denops, {} as PreviewParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    previewer.preview(denops, {} as PreviewParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    previewer.preview(denops, {} as PreviewParams<DetailUnit>, {});
  });
});
