import { TFormSchema } from "@/schemas/formSchema"

export interface IHeaderItems {
  item: number,
  isDone: boolean
}

export interface IEmployee extends TFormSchema {
  id?: number,
  item: number
}