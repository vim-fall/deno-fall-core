/**
 * Promish<T> represents a value that can be either of type T or a Promise of type T.
 */
export type Promish<T> = T | Promise<T>;

/**
 * Recursively flattens the nested structure of an object type, transforming
 * each property to its resolved (non-nested) type.
 */
export type FlatType<T> = T extends Record<PropertyKey, unknown>
  ? { [K in keyof T]: FlatType<T[K]> }
  : T;
