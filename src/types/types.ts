import type { FormSchema } from "@/schemas/formSchema"

export interface IHeaderItems {
  item: number,
  isDone: boolean
}

export interface IEmployee extends FormSchema {
  id?: string | number
}