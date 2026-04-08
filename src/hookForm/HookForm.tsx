import { useForm, type SubmitHandler } from "react-hook-form"
import { schema, type FormFields } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function HookForm () {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com"
    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      setError("email", {
        message: "This email is already taken"
      });
      console.log(error)
    }
  }

  return (
    <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email")}
        type="text"
        placeholder="Email"
      />
      {errors.email && <div className="text-red-500">{errors.email.message}</div>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <div className="text-red-500">{errors.password.message}</div>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  )
}