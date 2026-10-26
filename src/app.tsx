import { createRouter, RouterProvider } from "@tanstack/react-router"
import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"

import { routeTree } from "@/route-tree.gen"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import NotFound from "@/components/not-found"
import OnError from "@/components/on-error"

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: OnError,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      }),
  )

  return (
    <I18nProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </I18nProvider>
  )
}
