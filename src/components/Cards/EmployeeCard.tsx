import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EmployeeCard = () => {
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
          <Card className="h-[104px] mb-6">
            <CardContent className="flex px-0 py-0 h-full overflow-auto">
              <div className="flex-1 py-2 pl-5">
                <p className="text-2xl text-muted-foreground font-normal mb-3">
                  Lucas
                </p>
                <div className="space-x-5">
                  <Badge variant="info">03848320</Badge>
                  <Badge variant="info">Sem atividades</Badge>
                  <Badge variant="info">Junior</Badge>
                </div>
              </div>

              <Dialog>
                <DialogTrigger className="bg-primaryBlue rounded-e-sm h-full px-4 text-3xl text-bold text-white">
                  ...
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* <div className="flex flex-col items-center">
            <Inbox
              size={132}
              strokeWidth={0.75}
              className="mx-auto text-[#DCE0E6]"
            />
            <p className="text-center">Sem usuários...</p>
          </div> */}
        </ScrollArea>

        <div className="flex justify-end items-center gap-5">
          <p className="text-sm">A etapa está concluída?</p>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
