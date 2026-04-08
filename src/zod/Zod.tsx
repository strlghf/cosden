import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodSchemax } from "./zodSchema"
import { useForm } from "react-hook-form"
import { userSchema } from "./zodSchema";

export function Zod () {
  const form = useForm<ZodSchemax>({
    resolver: zodResolver(userSchema)
  });

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

  const handleSubmit = (data: ZodSchemax) => {
    const result = userSchema.safeParse(data);
  }
  
  return (
    <div>
      <h1>Hello Cosden!</h1>
    </div>
  )
}