import { type ZodSchemax } from "./zodSchema"
import { useForm } from "react-hook-form"

export function Zod () {
  const form = useForm<ZodSchemax>();
  
  const user: ZodSchemax = {
    firstName: "Darius",
    email: "contact@cosdensolutions.io",
    profileUrl: "https://google.com",
    age: 18,
    friends: ["friend 1", "friend 2", "friend 3"],
    settings: {
      isSubscribed: true
    }
  }

  return (
    <div>
      <h1>Hello Cosden!</h1>
    </div>
  )
}