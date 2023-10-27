import { z } from "zod"

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const rgRegex = /^\d{7,8}(-\d{1})?$/;

export const formSchema = z.object({
  isActive: z.boolean().default(false).optional(),
  employeeName: z
    .string({
      required_error: "Campo obrigatório",
      invalid_type_error: "Números não são válidos!",
    })
    .min(2, {
      message: "O nome precisa ter mais de 2 caracteres.",
    })
    .max(40, { message: "Limite máximo de caracteres atingido!" })
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  cpf: z
    .string({ required_error: "Campo obrigatório!" })
    .trim()
    .regex(cpfRegex, "CPF inválido!"),
  rg: z
    .string({ required_error: "Campo obrigatório!" })
    .trim()
    .regex(rgRegex, "RG inválido!")
    .max(9, { message: "RG inválido!" }),
  gender: z.enum(["M", "F"], {
    required_error: "Campo obrigatório!",
  }),
  birthDate: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .regex(dateRegex, "Data inválida!"),
  position: z.string({
    required_error: "Campo obrigatório!",
  }),
  hasEpi: z.boolean().default(false).optional(),
  employeeEpis: z.array(
    z.object({
      activity: z.string({ required_error: "Campo obrigatório!" }),
      epis: z.object({
        epi: z.string({ required_error: "Campo obrigatório!" }),
        ca: z.coerce.number({ required_error: "Campo obrigatório!" }),
      }),
    })
  ),
  employeeFile: z.any().optional(),
});

export type TFormSchema = z.infer<typeof formSchema>