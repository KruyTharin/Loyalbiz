import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layout";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Search, MoreVertical, Plus, Minus, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});

type Customer = {
  id: string;
  name: string;
  phone: string;
  points: number;
  visits: number;
  lastVisit: string;
};

const defaultData: Customer[] = [
  {
    id: "1",
    name: "Sokha Rith",
    phone: "012345678",
    points: 7,
    visits: 7,
    lastVisit: "Feb 15, 2024",
  },
  {
    id: "2",
    name: "Dara Sam",
    phone: "098765432",
    points: 3,
    visits: 3,
    lastVisit: "Feb 16, 2024",
  },
  {
    id: "3",
    name: "Chitra Long",
    phone: "011223344",
    points: 10,
    visits: 12,
    lastVisit: "Feb 14, 2024",
  },
  {
    id: "4",
    name: "Bopha Keo",
    phone: "088776655",
    points: 5,
    visits: 5,
    lastVisit: "Feb 10, 2024",
  },
];

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("name", {
    header: "Customer",
    cell: (info) => (
      <div className="flex items-center gap-3 py-1">
        <div className="w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center text-sm font-bold text-neutral-600">
          {info.getValue().charAt(0)}
        </div>
        <div>
          <p className="font-bold text-neutral-900 leading-none">
            {info.getValue()}
          </p>
          <p className="text-xs text-neutral-400 font-medium mt-1">
            {info.row.original.phone}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("points", {
    header: "Stamps",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <span className="font-bold text-sm w-4">{info.getValue()}</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-neutral-100 rounded-md transition-colors border border-neutral-100">
            <Plus size={14} />
          </button>
          <button className="p-1 hover:bg-neutral-100 rounded-md transition-colors border border-neutral-100">
            <Minus size={14} />
          </button>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
    cell: (info) => (
      <span className="text-sm font-medium text-neutral-600">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("lastVisit", {
    header: "Last Visit",
    cell: (info) => (
      <span className="text-sm text-neutral-400 font-medium">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <button className="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-400">
        <MoreVertical size={18} />
      </button>
    ),
  }),
];

function CustomersPage() {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdminLayout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <Button size="md" className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Add Customer
          </Button>
        </div>

        <Card className="p-0 overflow-hidden border-neutral-100 shadow-sm">
          <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center gap-4 bg-white/50">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={16}
              />
              <Input
                placeholder="Search by name or phone..."
                className="pl-10 h-10 text-sm bg-neutral-50 border-none rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto px-4 h-10 border-neutral-100 rounded-xl font-semibold"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-neutral-400 text-[10px] uppercase font-bold tracking-widest leading-none">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-4">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-neutral-100 flex justify-between items-center text-xs font-bold text-neutral-400">
            <span>Showing 4 of 342 customers</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                Prev
              </Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
