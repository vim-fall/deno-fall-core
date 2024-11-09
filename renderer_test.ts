import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { Promish } from "./_typeutil.ts";
import type { Renderer, RenderParams } from "./renderer.ts";

Deno.test("Renderer", async (t) => {
  const denops = new DenopsStub();
  const renderer: Renderer<{ a: string }> = {
    render: () => {},
  };

  await t.step("passed type is equal to the type restriction", () => {
    const items = renderer.render(
      denops,
      {} as RenderParams<{ a: string }>,
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
    const items = renderer.render(
      denops,
      {} as RenderParams<{ a: string; b: string }>,
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
    const items = renderer.render(
      denops,
      // @ts-expect-error: 'a' is missing
      {} as RenderParams<{ b: string }>,
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
