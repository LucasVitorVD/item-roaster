import { Inbox } from "lucide-react";

interface Props {
  message?: string
}

const EmptyContent = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Inbox size={132} strokeWidth={0.75} className="mx-auto text-[#DCE0E6]" />
      <p className="text-center">{message}</p>
    </div>
  );
};

export default EmptyContent;
