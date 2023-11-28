import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, TFormSchema } from "@/schemas/formSchema";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setToggleComponent } from "@/features/item/itemSlice";
import type { IEmployee } from "@/types/types";
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
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "@/features/employee/employee-api-slice";

interface Props {
  preloadedData?: IEmployee;
  setOpenModal?: React.Dispatch<boolean>;
}

const EmployeeForm = ({ preloadedData, setOpenModal }: Props) => {
  const currentItem = useSelector((state: RootState) => state.item.currentItem);
  const dispatch = useDispatch();

  const [addEmployee] = useAddEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: preloadedData ?? {
      employeeName: "",
      cpf: "",
      rg: "",
      birthDate: "",
      isActive: false,
      hasEpi: false,
      employeeEpis: [
        {
          activity: "",
          epis: {
            epi: "",
            ca: 0,
          },
        },
      ],
      employeeFile: "",
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
    append({ activity: "", epis: { epi: "", ca: 0 } });
  }

  function handleModalClose() {
    if (setOpenModal) setOpenModal(false);
  }

  function onSubmit(data: TFormSchema) {
    const employee: IEmployee = {
      ...data,
      employeeEpis: hasEpiValue ? [] : data.employeeEpis,
      item: currentItem,
    };

    if (preloadedData) {
      updateEmployee({ id: preloadedData.id!, data: employee });
      handleModalClose();
      return;
    } else {
      addEmployee(employee);
      dispatch(setToggleComponent("view"));
    }
  }

  return (
    <ScrollArea className="h-[450px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" role="employeeForm">
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
                  name="employeeName"
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
                        <Input
                          type="text"
                          mask="999.999.999-99"
                          autoComplete="off"
                          {...field}
                        />
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
                        <Input type="text" autoComplete="off" {...field} />
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
                    <div key={field.id} role="epiForm">
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
                          <div className="flex flex-wrap items-center gap-5 mt-5">
                            <FormField
                              control={form.control}
                              name={`employeeEpis.${index}.epis.epi`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>Selecione o EPI:</FormLabel>
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
                              name={`employeeEpis.${index}.epis.ca`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Informe o número do CA:</FormLabel>
                                  <FormControl>
                                    <Input type="number" min={0} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      {employeeEpisArr.length >= 2 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2 text-red-500"
                          role="removeFieldButton"
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

          {!preloadedData && (
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
          )}

          <Button type="submit" variant={"outline"} className="w-full">
            Salvar
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EmployeeForm;
