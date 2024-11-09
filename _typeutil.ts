/**
 * Promish<T> represents a value that can be either of type T or a Promise of type T.
 */
export type Promish<T> = T | Promise<T>;
