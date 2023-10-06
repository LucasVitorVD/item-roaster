import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Menu } from "lucide-react";
import HeaderCard from "./components/Header/HeaderCard";
import { Button } from "./components/ui/button";
import EmployeeCard from "./components/Cards/EmployeeCard";
import InfoCard from "./components/Cards/InfoCard";

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />

      <main
        className={`flex flex-col flex-1 p-5 transition-all ease-in-out max-w-full md:p-10 ${
          toggleMenu ? "blur-sm" : "filter-none"
        } lg:filter-none`}
      >
        <Menu
          onClick={() => setToggleMenu(true)}
          size={30}
          className="text-primaryBlue mb-7 lg:hidden"
        />

        <section>
          <HeaderCard />
        </section>

        <section className="flex flex-col gap-5 mt-8 min-h-[30.25rem] lg:flex-row">
          <InfoCard />
          <EmployeeCard />
        </section>

        <div className="flex justify-end mt-5">
          <Button className="bg-primaryBlue w-48 text-sm font-bold hover:bg-blue-400">
            Próximo passo
          </Button>
        </div>
      </main>
    </div>
  );
};

export default App;
