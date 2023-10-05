import { Card, CardContent } from "@/components/ui/card";
import HeaderItem from "./HeaderItem";

const HeaderCard = () => {
  return (
    <Card className="flex h-36 px-6 overflow-x-scroll md:overflow-x-auto">
      <CardContent className="h-full flex items-center justify-between gap-10 flex-1 before:content-[''] before:border-dashed before:border-t-4 before:border-t-primaryBlue before:w-full before:h-1 before:absolute before:top-[37%] p-0 relative">
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={true} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
        <HeaderItem item="ITEM 1" isDone={false} />
      </CardContent>
    </Card>
  );
};

export default HeaderCard;
