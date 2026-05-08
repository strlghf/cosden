import { z } from "zod";

export const schema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export type FormFields = z.infer<typeof schema>