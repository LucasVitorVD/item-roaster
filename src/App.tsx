import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router";
import type { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { setToggleMenu } from "@/features/sidebar/sidebarSlice";
import { Menu } from "lucide-react";
import { useEffect } from "react";

const App = () => {
  const toggleMenu = useSelector(
    (state: RootState) => state.sidebar.toggleMenu
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    function isLogged() {
      if (!localStorage.getItem('token')) {
        navigate("/login")
      }
    }

    isLogged()
  }, [token])

  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      <main
        className={`flex flex-col flex-1 p-5 transition-all ease-in-out max-w-full md:p-10 ${
          toggleMenu ? "blur-sm" : "filter-none"
        } lg:filter-none`}
      >
        <Menu
          onClick={() => dispatch(setToggleMenu(true))}
          size={30}
          className={`text-primaryBlue mb-7 ${!token ? 'hidden' : 'visible'} lg:hidden`}
          data-testid="lucide-menu-icon"
        />

        <Outlet />
      </main>
    </div>
  );
};

export default App;
