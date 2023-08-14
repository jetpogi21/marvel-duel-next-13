//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { CardUnityFormikShape } from "@/interfaces/CardUnityInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";

export const CardUnityColumns: ColumnDef<CardUnityFormikShape>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const toggleSelectAllRow = table.options.meta?.toggleSelectAllRow;
      return (
        <div className="flex justify-center w-full">
          <Checkbox
            tabIndex={-1}
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={() => {
              toggleSelectAllRow && toggleSelectAllRow();
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row, table }) => {
      const toggleRow = table.options.meta?.toggleRow;
      return (
        <div className="flex justify-center">
          <Checkbox
            tabIndex={-1}
            checked={row.getIsSelected()}
            onCheckedChange={() => {
              toggleRow && toggleRow(row.index);
            }}
            aria-label="Select row"
          />
        </div>
      );
    },
  },
  //Generated by GetAllTableFieldCellInputBySeqModel
  //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "cardCompositions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Card Compositions"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell {...cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "Text",
      label: "Card Compositions",
    },
    enableSorting: true,
  },
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <DeleteRowColumn {...cell} />,
  },
];