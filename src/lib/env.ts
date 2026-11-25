import { Type as t } from "typebox"
import { Value } from "typebox/value"

const envSchema = t.Object({
  VITE_API_URL: t.String(),
})

const parsed = Value.Parse(envSchema, import.meta.env)

export const env = {
  ...parsed,
}
