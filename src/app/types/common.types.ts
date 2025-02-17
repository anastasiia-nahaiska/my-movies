export type Primitives = string | number | boolean | bigint | undefined | null | symbol;

export type AnyArray = (Primitives | AnyObject)[];

export type AnyObject = {
  [key: string]: Primitives | AnyArray | AnyObject;
};
