import EmployeeManagementCard from "@/components/Cards/EmployeeManagementCard";
import InfoCard from "@/components/Cards/InfoCard";
import HeaderCard from "@/components/Header/HeaderCard";
import { setCurrentItem } from "@/features/item/itemSlice";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const currentItem = useSelector((state: RootState) => state.item.currentItem);
  const dispatch = useDispatch();

  return (
    <>
      <section>
        <HeaderCard />
      </section>

      <section className="flex flex-col gap-5 mt-8 min-h-[30.25rem] lg:flex-row">
        <InfoCard />
        <EmployeeManagementCard />
      </section>

      <div className="flex justify-end mt-5">
        <Button
          onClick={() => dispatch(setCurrentItem(currentItem + 1))}
          className="bg-primaryBlue w-48 text-sm font-bold hover:bg-blue-400"
        >
          Próximo passo
        </Button>
      </div>
    </>
  );
};

export default Home;
