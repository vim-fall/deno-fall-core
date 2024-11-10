import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { UnitDetail } from "./item.ts";
import type { Matcher, MatchParams } from "./matcher.ts";

Deno.test("Matcher", async (t) => {
  const denops = new DenopsStub();

  await t.step("without type constraint is equal to UnitDetail", () => {
    assertType<IsExact<Matcher, Matcher<UnitDetail>>>(true);
  });

  await t.step("match follows the type constraint", () => {
    const matcher: Matcher<{ a: string }> = { match: async function* () {} };
    matcher.match(denops, {} as MatchParams<{ a: string }>, {});
    matcher.match(denops, {} as MatchParams<{ a: string; b: string }>, {});
    // @ts-expect-error: 'a' is missing
    matcher.match(denops, {} as MatchParams<{ b: string }>, {});
    // @ts-expect-error: 'a' is missing
    matcher.match(denops, {} as MatchParams<Detail>, {});
    // @ts-expect-error: 'a' is missing
    matcher.match(denops, {} as MatchParams<UnitDetail>, {});
  });
});
