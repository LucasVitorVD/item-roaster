import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setToggleComponent } from "@/features/item/itemSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EmployeeView from "../EmployeeView/EmployeeView";
import EmployeeForm from "../Form/Form";
import { ArrowLeft } from "lucide-react";

const EmployeeManagementCard = () => {
  const toggleComponent = useSelector((state: RootState) => state.item.toggleComponent); 
  const dispatch = useDispatch()

  return (
    <Card className="w-full h-full" role="managementCard">
      <CardHeader className="bg-primaryBlue py-3 rounded-t-sm">
        <CardTitle className="flex items-center gap-4 text-xl text-card md:text-3xl">
          {toggleComponent === "view" ? (
            <p>Funcionário(s)</p>
          ) : (
            <>
              <ArrowLeft onClick={() => dispatch(setToggleComponent("view"))} cursor="pointer" />
              <p>Adicionar Funcionário</p>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-6">
        {toggleComponent === "view" ? (
          <EmployeeView />
        ) : (
          <EmployeeForm />
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeManagementCard;
