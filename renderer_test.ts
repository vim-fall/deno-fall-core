import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { UnitDetail } from "./item.ts";
import type { Renderer, RenderParams } from "./renderer.ts";

Deno.test("Renderer", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Renderer, Renderer<UnitDetail>>>(true);
  });

  await t.step("render follows the type constraint", () => {
    const renderer: Renderer<{ a: string }> = { render: () => {} };
    renderer.render(denops, {} as RenderParams<{ a: string }>, {});
    renderer.render(denops, {} as RenderParams<{ a: string; b: string }>, {});
    // @ts-expect-error: 'a' is missing
    renderer.render(denops, {} as RenderParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    renderer.render(denops, {} as RenderParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    renderer.render(denops, {} as RenderParams<UnitDetail>, {});
  });
});
