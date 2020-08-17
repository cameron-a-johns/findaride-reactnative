import SyncStorage from 'sync-storage';
import { StorageKeys } from '../utilities';

export class LocalStorage {
  static Get(index: keyof typeof StorageKeys) {
    return SyncStorage.get(index) || undefined;
  }

  static Set(index: keyof typeof StorageKeys, value: string) {
    return SyncStorage.set(index, value);
  }
}
