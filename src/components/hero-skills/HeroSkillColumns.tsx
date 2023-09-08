//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { HeroSkillFormikShape } from "@/interfaces/HeroSkillInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
import { Check, X } from "lucide-react";
import { format } from "date-fns";
//Generated by GetControlOptionsImportLine - GetControlOptionsImportLine
import { CONTROL_OPTIONS } from "@/utils/constants/HeroSkillConstants";


export const HeroSkillColumns: ColumnDef<HeroSkillFormikShape>[] = [
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
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader
     
      column={column}
      title="Name"
    />
  ),
  cell: (cell) => {
 return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      )
},
  meta: {
    type: "Text", label:"Name",
  },
enableSorting: true
},//Generated by GetTableFieldCellInput - Editable Table Cell
{
  accessorKey: "type",
  header: ({ column }) => (
    <DataTableColumnHeader
     
      column={column}
      title="Type"
    />
  ),
  cell: (cell) => {
 return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} options={CONTROL_OPTIONS["type"]}/>
      ) : (
        //@ts-ignore
        cell.getValue()
      )
},
  meta: {
    type: "Select", label:"Type",
  },
enableSorting: true
},//Generated by GetTableFieldCellInput - Editable Table Cell
{
  accessorKey: "cost",
  header: ({ column }) => (
    <DataTableColumnHeader
     
      column={column}
      title="Cost"
    />
  ),
  cell: (cell) => {
 return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      )
},
  meta: {
    type: "Text", label:"Cost",width: 100,isNumeric: true,isWholeNumber: true,
  },
enableSorting: true
},//Generated by GetTableFieldCellInput - Editable Table Cell
{
  accessorKey: "description",
  header: ({ column }) => (
    <DataTableColumnHeader
     
      column={column}
      title="Description"
    />
  ),
  cell: (cell) => {
 return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      )
},
  meta: {
    type: "Textarea", label:"Description",
  },
enableSorting: false
},//Generated by GetTableFieldCellInput - Editable Table Cell
{
  accessorKey: "heroId",
  header: ({ column }) => (
    <DataTableColumnHeader
     
      column={column}
      title="Hero"
    />
  ),
  cell: (cell) => {
 return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} options={cell.table.options.meta?.options?.heroList || []}/>
      ) : (
        //@ts-ignore
        cell.row.original.Hero.heroName
      )
},
  meta: {
    type: "ComboBox", label:"Hero",
  },
enableSorting: true
},
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <DeleteRowColumn {...cell} />,
  },
];
