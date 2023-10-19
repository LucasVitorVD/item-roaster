import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import EmployeeDataCard from "../EmployeeDataCard/EmployeeDataCard";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux"
import { updateItemStatus } from "@/features/item/itemSlice";

interface Props {
  setToggleComponent: React.Dispatch<"view" | "form">
}

const EmployeeView = ({ setToggleComponent }: Props) => {
  const currentItem = useSelector((state: RootState) => state.item.currentItem)
  const headerItem = useSelector((state: RootState) => state.item.headerItems).find(item => item.item === currentItem)
  const dispatch = useDispatch()

  return (
    <>
      <div className="flex flex-col gap-5">
        <Button variant={"filter"} className="w-full py-8" onClick={() => setToggleComponent("form")}>
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
        <Switch onClick={() => dispatch(updateItemStatus(!headerItem?.isDone))} checked={headerItem?.isDone ?? false} />
      </div>
    </>
  );
};

export default EmployeeView;