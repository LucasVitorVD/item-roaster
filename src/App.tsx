import { useState } from "react"
import Sidebar from "@/components/Sidebar/Sidebar"
import { Menu } from "lucide-react"
import HeaderCard from "./components/Header/HeaderCard"

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="flex min-h-screen relative">
      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />

      <main 
        className={`flex flex-col flex-1 p-10 transition-all ease-in-out max-w-full  sm:p-5 ${toggleMenu ? "blur-sm" : "filter-none"} lg:filter-none`}
      >
        <Menu onClick={() => setToggleMenu(true)} size={30} className="text-primaryBlue mb-7 lg:hidden" />
        
        <HeaderCard />

        <section>
          {/* Cards */}
        </section>
      </main>
    </div>
  )
}

export default App