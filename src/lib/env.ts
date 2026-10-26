import { Type as t } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"

const envSchema = t.Object({
  VITE_API_URL: t.String(),
})

const parsed = Value.Parse(envSchema, import.meta.env)

export const env = {
  ...parsed,
}
