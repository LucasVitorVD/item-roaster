import { z } from "zod"

export const registerFormSchema = z
  .object({
    email: z.string({ 
        required_error: "Campo obrigatório", invalid_type_error: "Email inválido!" 
      })
      .email({ message: "Formato de email inválido!" }),
    password: z.string({ 
        required_error: "Campo obrigatório", invalid_type_error: "Senha inválida!" 
      })
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(20, "Limite de caracteres atigido!"),
    confirmPassword: z.string({ 
        required_error: "Campo obrigatório", 
        invalid_type_error: "Senha inválida!" 
      })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas devem ser iguais!",
  path: ["confirmPassword"]
})

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>