import Sidebar from "./components/Sidebar";
import VariablePages from "./components/VariablePages";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function AdminPage() {
  return (
    <main className="w-full h-fit flex flex-row">
      <Sidebar />
      <VariablePages />
    </main>
  );
}
