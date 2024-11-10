import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { Detail, UnitDetail } from "./item.ts";
import type { Action, InvokeParams } from "./action.ts";

Deno.test("Action", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Action, Action<UnitDetail>>>(true);
  });

  await t.step("invoke follows the type constraint", () => {
    const action: Action<{ a: string }> = { invoke: () => {} };
    action.invoke(denops, {} as InvokeParams<{ a: string }>, {});
    action.invoke(denops, {} as InvokeParams<{ a: string; b: string }>, {});
    // @ts-expect-error: 'a' is missing
    action.invoke(denops, {} as InvokeParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    action.invoke(denops, {} as InvokeParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    action.invoke(denops, {} as InvokeParams<UnitDetail>, {});
  });
});
