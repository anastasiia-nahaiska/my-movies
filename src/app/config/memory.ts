import { MMKV } from 'react-native-mmkv';

export class Memory {
  private storage: MMKV;

  public constructor(storage = new MMKV()) {
    this.storage = storage;
  }

  public setItem<T>(key: string, value: T) {
    this.storage.set(key, JSON.stringify(value));
  }

  public clear() {
    this.storage.clearAll();
  }

  public removeItem(key: string) {
    this.storage.delete(key);
  }

  public getItem<T>(key: string) {
    const data = this.storage.getString(key);
    return typeof data === 'string' ? (JSON.parse(data) as T) : null;
  }
}

export const memory = new Memory();
