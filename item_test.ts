import { assertType, type IsExact } from "@std/testing/types";
import type { Detail, EmptyDetail, IdItem } from "./item.ts";

Deno.test("IdItem", async (t) => {
  await t.step("id is 'unknown'", () => {
    const item: IdItem<EmptyDetail> = {
      id: "unknown",
      value: "",
      detail: {},
    };
    assertType<IsExact<typeof item, IdItem<EmptyDetail>>>(true);
  });

  await t.step("detail must be 'Detail'", () => {
    const base = { id: "unknown", value: "" };
    const _items: IdItem<Detail>[] = [
      {
        ...base,
        // @ts-expect-error: number is not Detail
        detail: 1,
      },
      {
        ...base,
        // @ts-expect-error: string is not Detail
        detail: "",
      },
      {
        ...base,
        // @ts-expect-error: boolean is not Detail
        detail: true,
      },
      {
        ...base,
        // @ts-expect-error: array is not Detail
        detail: [],
      },
      {
        ...base,
        // @ts-expect-error: Date is not Detail
        detail: new Date(),
      },
      {
        ...base,
        detail: {},
      },
      {
        ...base,
        detail: {
          a: "string",
          b: 1,
          c: true,
          d: [],
          e: new Date(),
          f: () => {},
          0: "number",
          [Symbol("g")]: "symbol",
        },
      },
    ];
  });
});
