import "@/styles/globals.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "@/app"
import { getDefaultLocale, useLocaleStore } from "@/stores/locale"

const rootEl = document.getElementById("root")
if (rootEl) {
  const { setLocale } = useLocaleStore.getState()

  const initialLocale = getDefaultLocale()
  await setLocale(initialLocale)

  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
