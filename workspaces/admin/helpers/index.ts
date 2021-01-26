/** 型安全な Object.values を返す */
export const typedValues = <T extends Record<string, unknown>>(value: T): T[keyof T][] => Object.values(value) as T[keyof T][];
