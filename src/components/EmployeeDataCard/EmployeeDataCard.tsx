import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeForm from "../Form/Form";

const EmployeeDataCard = () => {
  return (
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
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="w-full justify-around">
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="delete">Excluir</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <EmployeeForm />
              </TabsContent>
              <TabsContent value="delete">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-lg font-bold">Excluir Funcionário</p>
                    <p className="text-muted-foreground">Tem certeza de que deseja excluir este funcionário? Esta ação é irreversível e removerá permanentemente os dados associados a este funcionário do sistema.</p>
                  </div>
                  <Button type="button" variant={"destructive"} className="self-end">Excluir</Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant={"secondary"}>Fechar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EmployeeDataCard;
