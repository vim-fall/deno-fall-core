import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { Promish } from "./_typeutil.ts";
import type { Action, InvokeParams } from "./action.ts";

Deno.test("Action", async (t) => {
  const denops = new DenopsStub();
  const action: Action<{ a: string }> = {
    invoke: () => {},
  };
  await t.step("passed type is equal to the type restriction", () => {
    const items = action.invoke(
      denops,
      {} as InvokeParams<{ a: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | true>
      >
    >(true);
  });

  await t.step("passed type establishes the type restriction", () => {
    const items = action.invoke(
      denops,
      {} as InvokeParams<{ a: string; b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | true>
      >
    >(true);
  });

  await t.step("passed type does not establish the type restriction", () => {
    const items = action.invoke(
      denops,
      // @ts-expect-error: 'a' is missing
      {} as InvokeParams<{ b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        Promish<void | true>
      >
    >(true);
  });
});
