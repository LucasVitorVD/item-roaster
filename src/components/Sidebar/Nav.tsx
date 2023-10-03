import { Hotel, PenSquare, Network, Bell, History, User2 } from "lucide-react";

const items = [
  {
    key: "1",
    label: "Option 1",
    icon: <Hotel size={30} />,
  },
  {
    key: "2",
    label: "Option 2",
    icon: <PenSquare size={30} />,
  },
  {
    key: "3",
    label: "Option 3",
    icon: <Network size={30} />,
  },
  {
    key: "4",
    label: "Option 4",
    icon: <Bell size={30} />,
  },
  {
    key: "5",
    label: "Option 5",
    icon: <History size={30} />,
  },
  {
    key: "6",
    label: "Option 6",
    icon: <User2 size={30} />,
  },
];

const Nav = () => {
  return (
    <nav className="relative h-full w-full flex flex-col items-center justify-center gap-6 before:content-[''] before:h-16 before:w-full before:bg-white before:absolute before:top-[50px]">
      {items.map((item) => (
        <button
          key={item.key}
          className="bg-white text-primaryBlue p-1.5 rounded-lg cursor-pointer transition-all"
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
};

export default Nav;