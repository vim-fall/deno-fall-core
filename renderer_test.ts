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

  await t.step(
    "check if the type constraint correctly triggers the type checking",
    () => {
      const renderer1: Renderer<{ a: string }> = {
        render: () => {},
      };
      const renderer2: Renderer<{ b: string }> = {
        render: () => {},
      };
      const renderer3: Renderer<{ c: string }> = {
        render: () => {},
      };
      function strictFunction<T extends { a: string }>(_: Renderer<T>) {}
      strictFunction(renderer1);
      // @ts-expect-error: 'a' is missing
      strictFunction(renderer2);
      // @ts-expect-error: 'a' is missing
      strictFunction(renderer3);
    },
  );
});
