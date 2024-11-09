import { assertType, type IsExact } from "@std/testing/types";
import { DenopsStub } from "@denops/test/stub";
import type { IdItem } from "./item.ts";
import type { Matcher, MatchParams } from "./matcher.ts";

Deno.test("Matcher", async (t) => {
  const denops = new DenopsStub();
  const matcher: Matcher<{ a: string }> = {
    match: async function* () {},
  };

  await t.step("passed type is equal to the type restriction", () => {
    const items = matcher.match(
      denops,
      {} as MatchParams<{ a: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        AsyncIterableIterator<IdItem<{ a: string }>>
      >
    >(true);
  });

  await t.step("passed type establishes the type restriction", () => {
    const items = matcher.match(
      denops,
      {} as MatchParams<{ a: string; b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        AsyncIterableIterator<IdItem<{ a: string; b: string }>>
      >
    >(true);
  });

  await t.step("passed type does not establish the type restriction", () => {
    const items = matcher.match(
      denops,
      // @ts-expect-error: 'a' is missing
      {} as MatchParams<{ b: string }>,
      {},
    );
    assertType<
      IsExact<
        typeof items,
        AsyncIterableIterator<IdItem<{ a: string }>>
      >
    >(true);
  });
});
