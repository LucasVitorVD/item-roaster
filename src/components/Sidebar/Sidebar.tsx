import { ChevronLeft } from "lucide-react";
import Nav from "./Nav";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setToggleMenu } from "@/features/sidebar/sidebarSlice";

const Sidebar = () => {
  const toggleMenu = useSelector((state: RootState) => state.sidebar.toggleMenu)
  const dispatch = useDispatch()

  const isLogin = localStorage.getItem("token") ? true : false

  return (
    <aside 
      className={`flex flex-col items-center justify-center bg-primaryBlue w-20 h-full z-10 absolute rounded-r-2xl transition-all ease-in-out duration-500 lg:h-screen lg:z-auto lg:static lg:visible ${toggleMenu ? "visible left-0" : "invisible left-[-490px]"} ${isLogin ? "visible" : "hidden"}`}
      role="sidebar"
    >
      <Nav />
      
      <div
        onClick={() => dispatch(setToggleMenu(false))}
        className="flex justify-center p-5 border-t-2 w-full lg:hidden"
      >
        <ChevronLeft color="white" size={30} data-testid="lucide-close-icon" />
      </div>
    </aside>
  );
};

export default Sidebar;
