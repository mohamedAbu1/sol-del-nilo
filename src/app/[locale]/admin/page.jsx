import Sidebar from "./components/Sidebar";
import VariablePages from "./components/VariablePages";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function AdminPage() {
  return (
    <main style={{ backgroundColor:"#181a1b"}} className="w-full h-fit flex flex-row">
      <Sidebar />
      <VariablePages />
    </main>
  );
}
