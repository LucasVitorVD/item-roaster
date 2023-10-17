import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

const EmployeeForm = () => {
  const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const rgRegex = /^\d{7,8}(-\d{1})?$/;

  const formSchema = z.object({
    isActive: z.boolean().default(false).optional(),
    username: z
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
        epis: z.array(
          z.object({
            epi: z.string({ required_error: "Campo obrigatório!" }),
            ca: z.coerce.number({ required_error: "Campo obrigatório!" }),
          })
        ),
      })
    ),
    employeeFile: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      cpf: "",
      rg: "",
      birthDate: "",
      isActive: false,
      hasEpi: false,
      employeeEpis: [
        {
          activity: "",
          epis: [
            {
              epi: "",
              ca: 0,
            },
          ],
        },
      ],
    },
  });

  const { control, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employeeEpis",
  });

  const hasEpiValue = watch("hasEpi");
  const employeeEpisArr = watch("employeeEpis");

  function addNewField() {
    append({ activity: "", epis: [{ epi: "", ca: 0 }] });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.employeeEpis = hasEpiValue === true ? [] : values.employeeEpis;
    console.log(values);
  }

  return (
    <ScrollArea className="h-[450px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="border border-primaryBlue p-3 rounded-md">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>O funcionário está ativo?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid lg:grid-cols-2 gap-6 border border-primaryBlue p-3 rounded-md">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome:</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF:</FormLabel>
                      <FormControl>
                        <Input type="text" mask="999.999.999-99" autoComplete="false" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG:</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="false" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo:</FormLabel>
                      <FormControl className="pb-[.9rem]">
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-4"
                        >
                          <FormItem className="flex items-center space-x-1.5 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="M" />
                            </FormControl>
                            <FormLabel className="font-normal text-base">
                              Masculino
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1.5 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="F" />
                            </FormControl>
                            <FormLabel className="font-normal text-base">
                              Feminino
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Data de Nascimento:</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          mask="99/99/9999"
                          placeholder="dd/mm/aaaa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Júnior</SelectItem>
                          <SelectItem value="mid-level">Pleno</SelectItem>
                          <SelectItem value="senior">Sênior</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="border border-primaryBlue p-3 rounded-md space-y-5">
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  Quais EPIs o trabalhador usa na atividade?
                </p>
                <FormField
                  control={form.control}
                  name="hasEpi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>O trabalhador não usa EPI.</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              {!hasEpiValue &&
                fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <Card>
                        <CardContent className="border border-primaryBlue p-3 rounded-md">
                          <FormField
                            control={form.control}
                            name={`employeeEpis.${index}.activity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Selecione a atividade:</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="activity1">
                                      Ativid.1
                                    </SelectItem>
                                    <SelectItem value="activity2">
                                      Ativid.2
                                    </SelectItem>
                                    <SelectItem value="activity3">
                                      Ativid.3
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {field.epis.map((epi, epiIndex) => (
                            <div
                              key={epiIndex}
                              className="flex items-center gap-5 mt-5"
                            >
                              <FormField
                                control={form.control}
                                name={`employeeEpis.${index}.epis.${epiIndex}.epi`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Selecione o EPI:</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="calcado-seguranca">
                                          Calçado de segurança
                                        </SelectItem>
                                        <SelectItem value="other">
                                          Outro
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`employeeEpis.${index}.epis.${epiIndex}.ca`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Informe o número do CA:
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <button type="button" className="text-sm mt-8">
                                Adicionar EPI
                              </button>
                              {employeeEpisArr[index].epis.length >= 2 && (
                                <button
                                  type="button"
                                  className="mt-2 text-red-500 block"
                                >
                                  <Trash2 size={20} />
                                </button>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                      {employeeEpisArr.length >= 2 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2 text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  );
                })}
            </CardContent>
            {!hasEpiValue && (
              <CardFooter className="border border-none p-0 pt-5">
                <Button
                  type="button"
                  onClick={addNewField}
                  variant={"outline"}
                  className="w-full"
                >
                  Adicionar
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardContent className="border border-primaryBlue p-3 rounded-md">
              <FormField
                control={form.control}
                name="employeeFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Adicione Atestado de Saúde Ocupacional (opcional):
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Selecionar arquivo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Button type="submit" variant={"outline"} className="w-full">
            Salvar
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EmployeeForm;
