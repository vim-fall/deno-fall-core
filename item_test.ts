import { assertType, type IsExact } from "@std/testing/types";
import type { Detail, DetailUnit } from "./item.ts";

Deno.test("Detail", async (t) => {
  await t.step("is usable as a type constraint", () => {
    function constraint<T extends Detail>(_: T) {}
    constraint({});
    constraint({ a: "" });
    constraint({ a: "", b: "" });
    // @ts-expect-error: string is not assignable
    constraint("");
    // @ts-expect-error: number is not assignable
    constraint(0);
    // @ts-expect-error: boolean is not assignable
    constraint(true);
    // @ts-expect-error: array is not assignable
    constraint([]);
    // @ts-expect-error: Date is not assignable
    constraint(new Date());
    // @ts-expect-error: function is not assignable
    constraint(() => {});
  });

  await t.step("is NOT an unit of Detail", () => {
    assertType<IsExact<Detail & { a: string }, { a: string }>>(false);
    // misc
    assertType<IsExact<Detail, Detail>>(true);
    assertType<IsExact<Detail & Detail, Detail>>(true);
    assertType<IsExact<Detail & Detail, Detail>>(true);
  });
});

Deno.test("DetailUnit", async (t) => {
  await t.step("is NOT usable as a type constraint", () => {
    function constraint<T extends DetailUnit>(_: T) {}
    constraint({});
    constraint({ a: "" });
    constraint({ a: "", b: "" });
    // string is assignable!
    constraint("");
    // number is assignable!
    constraint(0);
    // boolean is assignable!
    constraint(true);
    // array is assignable!
    constraint([]);
    // Date is assignable!
    constraint(new Date());
    // function is assignable!
    constraint(() => {});
  });

  await t.step("is an unit of Detail", () => {
    assertType<IsExact<DetailUnit & { a: string }, { a: string }>>(true);
    // misc
    assertType<IsExact<DetailUnit, DetailUnit>>(true);
    assertType<IsExact<DetailUnit & DetailUnit, DetailUnit>>(true);
    assertType<IsExact<DetailUnit & Detail, Detail>>(true);
  });
});
