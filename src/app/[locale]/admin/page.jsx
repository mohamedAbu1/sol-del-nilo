import AdminLayout from "./layout"
import { SectionCards } from "./components/sectin-cardes"
import { ChartAreaInteractive } from "./components/chrat-area-int"
import { DataTable } from "./components/data-tabel"
import data from "./data.json"

export default function AdminPage() {
  return (
    <AdminLayout>
      <SectionCards />
      <ChartAreaInteractive />
      {/* <DataTable  /> */}
    </AdminLayout>
  )
}
