import { AnyClass } from '@app/types/common-types';

class Injector {
  private readonly map: Map<object, InstanceType<typeof Object>> = new Map();

  public get<T extends AnyClass<object>>(key: T) {
    return this.map.get(key) as InstanceType<T>;
  }

  public set<T extends AnyClass<object>>(key: T, value: InstanceType<T>) {
    return this.map.set(key, value);
  }
}

export const injector = new Injector();
