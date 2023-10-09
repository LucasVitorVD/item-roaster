import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmptyContent from "../EmptyContent/EmptyContent";
import EmployeeDataCard from "../EmployeeDataCard/EmployeeDataCard";

const FormCard = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="bg-primaryBlue py-3  rounded-t-sm">
        <CardTitle className="text-3xl text-card">Funcionário(s)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-5">
          <Button variant={"filter"} className="w-full py-8">
            + Adicionar
          </Button>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap sm:flex-nowrap gap-6">
              <Button variant={"filter"} className="w-full lg:w-48">
                Ver apenas ativos
              </Button>
              <Button variant={"filter"} className="w-full lg:w-48">
                Limpar Filtros
              </Button>
            </div>

            <span className="text-muted-foreground text-sm">Ativos 0 / 0</span>
          </div>
        </div>

        <ScrollArea className="flex flex-col h-[12rem]">
          <EmployeeDataCard />

          {/* <EmptyContent message="Sem usuários..." /> */}
        </ScrollArea>

        <div className="flex justify-end items-center gap-5">
          <p className="text-sm">A etapa está concluída?</p>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export default FormCard;
