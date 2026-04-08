import { z } from "zod";

const getUserSchema = z.object({
  limit: z.number(),
  offset: z.number()
})

type UsersFilters = z.infer<typeof getUserSchema>

export async function getUsers(filters: UsersFilters) {
  const result = getUserSchema.safeParse(filters);
}