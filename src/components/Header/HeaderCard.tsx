import { Card, CardContent } from "@/components/ui/card";
import { Hotel } from "lucide-react";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentItem } from "@/features/item/itemSlice";

const HeaderCard = () => {
  const headerItems = useSelector((state: RootState) => state.item.headerItems);
  const currentItem = useSelector((state: RootState) => state.item.currentItem);
  const dispatch = useDispatch();

  return (
    <Card className="flex h-36 px-6 overflow-x-scroll md:overflow-x-auto">
      <CardContent className="h-full flex items-center justify-between gap-10 flex-1 before:content-[''] before:border-dashed before:border-t-4 before:border-t-primaryBlue before:w-full before:h-1 before:absolute before:top-[37%] p-0 relative">
        {headerItems.map((item) => (
          <div
            key={item.item}
            className="flex flex-col items-center justify-center h-full cursor-pointer transition-all z-10"
            onClick={() => dispatch(setCurrentItem(item.item))}
          >
            <button
              data-currentitem={currentItem === item.item}
              className="rounded-3xl bg-primaryBlue p-2 my-2 data-[currentitem=true]:border data-[currentitem=true]:border-blue-800"
            >
              <Hotel size={50} color="white" />
            </button>
            <div className="text-center flex flex-col h-9">
              <span className="text-primaryBlue text-[.875rem] font-medium line-clamp-2">
                ITEM {item.item}
              </span>
              {item.isDone && (
                <span className="text-primaryBlue text-[.7rem] font-medium">
                  CONCLUÍDO
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HeaderCard;
