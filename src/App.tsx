import { useState } from "react";
import Dashboard from "./components/Dashboard";
import SidebarWithHeader from "./components/SideBar";

function App() {
  const [selectedPage, setSelectedPage] = useState("Cursos");

  return (
    <SidebarWithHeader
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      <Dashboard selectedPage={selectedPage} />
    </SidebarWithHeader>
  );
}

export default App;
