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

  await t.step(
    "check if the type constraint correctly triggers the type checking",
    () => {
      const action1: Action<{ a: string }> = {
        invoke: () => {},
      };
      const action2: Action<{ b: string }> = {
        invoke: () => {},
      };
      const action3: Action<{ c: string }> = {
        invoke: () => {},
      };
      function strictFunction<T extends { a: string }>(_: Action<T>) {}
      strictFunction(action1);
      // @ts-expect-error: 'a' is missing
      strictFunction(action2);
      // @ts-expect-error: 'a' is missing
      strictFunction(action3);
    },
  );
});
