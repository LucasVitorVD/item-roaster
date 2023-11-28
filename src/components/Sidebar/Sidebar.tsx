import { ChevronLeft } from "lucide-react";
import Nav from "./Nav";

interface SidebarProps {
  toggleMenu: boolean
  setToggleMenu: React.Dispatch<boolean>
}

const Sidebar = ({ toggleMenu, setToggleMenu }: SidebarProps) => {
  return (
    <aside 
      className={`flex flex-col items-center justify-center bg-primaryBlue w-20 h-full z-10 absolute rounded-r-2xl transition-all ease-in-out duration-500 lg:h-screen lg:z-auto lg:static lg:visible ${toggleMenu ? "visible left-0" : "invisible left-[-490px]"}`}
      role="sidebar"
    >
      <Nav />
      
      <div
        onClick={() => setToggleMenu(false)}
        className="flex justify-center p-5 border-t-2 w-full lg:hidden"
      >
        <ChevronLeft color="white" size={30} data-testid="lucide-close-icon" />
      </div>
    </aside>
  );
};

export default Sidebar;
