import { useState, useCallback } from "react";

function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (!item || item === "undefined") return defaultValue;
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStoredValue(key, defaultValue)
  );

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const nextValue =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(nextValue);

        if (typeof window !== "undefined") {
          if (nextValue === undefined) {
            localStorage.removeItem(key);
          } else {
            localStorage.setItem(key, JSON.stringify(nextValue));
          }
        }
      } catch (error) {
        console.warn(`Error saving to localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
