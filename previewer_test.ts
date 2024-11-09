import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { Promish } from "./_typeutil.ts";
import type { PreviewItem } from "./item.ts";
import type { Previewer, PreviewParams } from "./previewer.ts";

Deno.test("Previewer", async (t) => {
  const denops = new DenopsStub();
  const previewer: Previewer<{ a: string }> = {
    preview: () => {},
  };

  await t.step("passed type is equal to the type restriction", () => {
    const items = previewer.preview(
      denops,
      {} as PreviewParams<{ a: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | PreviewItem>
      >
    >(true);
  });

  await t.step("passed type establishes the type restriction", () => {
    const items = previewer.preview(
      denops,
      {} as PreviewParams<{ a: string; b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | PreviewItem>
      >
    >(true);
  });

  await t.step("passed type does not establish the type restriction", () => {
    const items = previewer.preview(
      denops,
      // @ts-expect-error: 'a' is missing
      {} as PreviewParams<{ b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | PreviewItem>
      >
    >(true);
  });

  await t.step(
    "check if the type constraint correctly triggers the type checking",
    () => {
      const previewer1: Previewer<{ a: string }> = {
        preview: () => {},
      };
      const previewer2: Previewer<{ b: string }> = {
        preview: () => {},
      };
      const previewer3: Previewer<{ c: string }> = {
        preview: () => {},
      };
      function strictFunction<T extends { a: string }>(_: Previewer<T>) {}
      strictFunction(previewer1);
      // @ts-expect-error: 'a' is missing
      strictFunction(previewer2);
      // @ts-expect-error: 'a' is missing
      strictFunction(previewer3);
    },
  );
});
