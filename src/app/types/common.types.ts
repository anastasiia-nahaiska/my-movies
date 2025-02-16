export type Primitives = string | number | boolean | bigint | undefined | null | symbol;

export type AnyArray = (Primitives | AnyJson)[];

export type AnyJson = {
  [key: string]: Primitives | AnyArray | AnyJson;
};
