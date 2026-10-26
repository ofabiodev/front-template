export type CookieOptions = {
  days?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: "Strict" | "Lax" | "None"
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split("; ") : []

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.split("=")

    if (key === name) {
      return decodeURIComponent(valueParts.join("="))
    }
  }

  return null
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  const {
    days = 7,
    path = "/",
    domain,
    secure = false,
    sameSite = "Lax",
  } = options

  let cookie = `${name}=${encodeURIComponent(value)}`

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    cookie += `; expires=${date.toUTCString()}`
  }

  if (path) cookie += `; path=${path}`
  if (domain) cookie += `; domain=${domain}`
  if (secure) cookie += `; Secure`
  if (sameSite) cookie += `; SameSite=${sameSite}`

  // biome-ignore lint/suspicious/noDocumentCookie: document.cookie is the standard browser API
  document.cookie = cookie
}
