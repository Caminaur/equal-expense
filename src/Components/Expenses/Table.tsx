import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { formatNumber } from "../../utils";

type Expense = {
  expense: string;
  amount: number;
};

type Props = {
  data: Expense[];
  onRemove: (index: number) => void;
};

export default function ExpenseTable({ data, onRemove }: Props) {
  const columns: ColumnDef<Expense>[] = [
    { accessorKey: "expense", header: "Expense" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) => formatNumber(getValue<number>()),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="bg-red-800 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
          onClick={() => onRemove(row.index)}
        >
          ✕
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-y-auto max-h-60 max-w-120 md:max-h-117 lg:max-h-80">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-dark-blue px-2 py-1 sm:px-4 sm:py-2 bg-light-blue text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border break-all border-dark-blue px-2 py-1 sm:px-4 sm:py-2 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
