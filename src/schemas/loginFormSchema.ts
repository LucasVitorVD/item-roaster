import { z } from "zod"

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório", invalid_type_error: "Email inválido!" }).regex(emailRegex, "Email inválido!"),
  password: z.string({ required_error: "Campo obrigatório", invalid_type_error: "Senha inválida!" })
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>