interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class Cache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private ttl: number;

  constructor(ttlMs: number) {
    this.ttl = ttlMs;
  }

  set(key: string, value: T): void {
    this.store.set(key, {
      data: value,
      timestamp: Date.now()
    });
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.store.clear();
  }
}