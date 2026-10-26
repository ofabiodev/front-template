import { Type as t, type Static } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"
import {
  getValidatedStorageItem,
  setStorageItem,
  storageKeys,
} from "@/lib/storage"

export const AppThemeSchema = t.Union([
  t.Literal("light"),
  t.Literal("dark"),
  t.Literal("auto"),
])

export type AppTheme = Static<typeof AppThemeSchema>
export type ResolvedTheme = "light" | "dark"

export function getThemePreference(): AppTheme {
  return getValidatedStorageItem(storageKeys.theme, AppThemeSchema) ?? "auto"
}

export function resolveTheme(theme: AppTheme): ResolvedTheme {
  if (theme === "light" || theme === "dark") return theme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function getTheme(): ResolvedTheme {
  return resolveTheme(getThemePreference())
}

export async function setTheme(input: unknown): Promise<AppTheme> {
  if (!Value.Check(AppThemeSchema, input)) {
    throw new Error("Invalid theme")
  }

  const theme = input as AppTheme
  setStorageItem(storageKeys.theme, theme)

  return theme
}
