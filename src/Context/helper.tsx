import React, { Provider } from 'react';
/**
 * Methods for handling contexts.
 */
class Context {
  /**
   * Create a context of type T and return both a hook and context providder .
   */
  static create<T>(): readonly [() => T, Provider<T | undefined>] {
    const context = React.createContext<T | undefined>(undefined);
    function useContext() {
      const currentContext = React.useContext(context);
      if (!currentContext) throw new Error('useContext must be inside a Provider with a value');
      return currentContext;
    }
    return [useContext, context.Provider] as const;
  }
}
export { Context };