import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

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
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EmployeeDataCard;
