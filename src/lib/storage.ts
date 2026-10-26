import type { TSchema, Static } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"

export const storageKeys = {
  locale: "app-locale",
  theme: "app-theme",
} as const

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getStorageItem(key: string): string | null {
  const storage = getLocalStorage()
  if (!storage) return null

  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function setStorageItem(key: string, value: string) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.setItem(key, value)
  } catch {
    // Ignore unavailable or blocked storage writes.
  }
}

export function removeStorageItem(key: string) {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.removeItem(key)
  } catch {
    // Ignore unavailable or blocked storage writes.
  }
}

export function getValidatedStorageItem<const Schema extends TSchema>(
  key: string,
  schema: Schema,
): Static<Schema> | null {
  const raw = getStorageItem(key)

  if (!raw || !Value.Check(schema, raw)) {
    return null
  }

  return raw as Static<Schema>
}
