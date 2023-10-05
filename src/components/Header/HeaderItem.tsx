import { Hotel } from "lucide-react";

interface Props {
  item: string;
  isDone: boolean;
}

const HeaderItem = ({ item, isDone }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full cursor-pointer transition-all z-10">
      <button className="rounded-3xl bg-primaryBlue p-2 my-2">
        <Hotel size={50} color="white" />
      </button>
      <div className="text-center flex flex-col h-9">
        <span className="text-primaryBlue text-[.875rem] font-medium line-clamp-2">
          {item.toUpperCase()}
        </span>
        {isDone && (
          <span className="text-primaryBlue text-[.7rem] font-medium">
            CONCLUÍDO
          </span>
        )}
      </div>
    </div>
  );
};

export default HeaderItem;
