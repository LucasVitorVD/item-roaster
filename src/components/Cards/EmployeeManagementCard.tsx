import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmployeeForm from "../Form/Form";

const EmployeeManagementCard = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="bg-primaryBlue py-3  rounded-t-sm">
        <CardTitle className="text-3xl text-card">Funcionário(s)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-6">
        {/* <EmployeeView /> */}
        <EmployeeForm />
      </CardContent>
    </Card>
  );
};

export default EmployeeManagementCard;
