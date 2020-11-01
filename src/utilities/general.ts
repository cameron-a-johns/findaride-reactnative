export function resolveOrFallback<T, K>(originalPromise: Promise<T> | undefined, fallback: K): Promise<T | K> {
    return new Promise((resolve) => resolve(originalPromise || fallback));
  }