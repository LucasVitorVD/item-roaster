import { useState } from "react"
import Sidebar from "@/components/Sidebar/Sidebar"
import { Menu } from "lucide-react"

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="flex min-h-screen relative">
      <Sidebar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />

      <main 
        className={`flex flex-col flex-1 transition-all ease-in-out ${toggleMenu ? "blur-sm" : "filter-none"} lg:filter-none`}
      >
        <Menu onClick={() => setToggleMenu(true)} size={30} className="text-primaryBlue lg:hidden" />
        
        <section>
          {/* HEADER */}
        </section>

        <section>
          {/* Cards */}
        </section>
      </main>
    </div>
  )
}

export default App