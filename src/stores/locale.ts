import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { i18n } from "@lingui/core"
import type { Messages } from "@lingui/core"
import { Type as t } from "@sinclair/typebox"
import {
  getValidatedStorageItem,
  setStorageItem,
  storageKeys,
} from "@/lib/storage"

export type AppLocale = "en" | "pt-BR"
export const AppLocaleSchema = t.Union([t.Literal("en"), t.Literal("pt-BR")])

interface LocaleStore {
  locale: AppLocale
  setLocale: (locale: AppLocale) => Promise<void>
}

export function getDefaultLocale(): AppLocale {
  const stored = getValidatedStorageItem(storageKeys.locale, AppLocaleSchema)
  if (stored) return stored

  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language
    if (browserLang.startsWith("pt")) return "pt-BR"
    if (browserLang.startsWith("en")) return "en"
  }
  return "en"
}

const compiledLocales = import.meta.glob("../locales/*/messages.ts")

export const useLocaleStore = create<LocaleStore>()(
  immer((set) => ({
    locale: getDefaultLocale(),

    setLocale: async (locale: AppLocale) => {
      const importPath = `../locales/${locale}/messages.ts`
      const importFn = compiledLocales[importPath]

      if (!importFn) {
        throw new Error(`Arquivo de tradução não encontrado para: ${locale}`)
      }

      const { messages } = (await importFn()) as { messages: Messages }

      i18n.load(locale, messages)
      i18n.activate(locale)

      setStorageItem(storageKeys.locale, locale)

      set((state) => {
        state.locale = locale
      })
    },
  })),
)
