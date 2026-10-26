import { getTheme } from "@/lib/theme"
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
  loader: async () => ({ theme: getTheme() }),
})

function RootComponent() {
  const { theme } = Route.useLoaderData()

  return (
    <>
      <HeadContent />
      <main
        data-app-shell
        className={`${theme} min-h-dvh bg-background text-foreground font-sans`}
      >
        <Outlet />
      </main>
    </>
  )
}
