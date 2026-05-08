import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().nullish(),
  email: z.email(),
  profileUrl: z.url(),
  age: z.number().min(18).max(100),
  friends: z.array(z.string()).max(3),
  settings: z.object({
    isSubscribed: z.boolean()
  })
})

export type ZodSchemax = z.infer<typeof userSchema>