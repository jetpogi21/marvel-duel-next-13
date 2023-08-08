//Generated by WriteToModelcolumns_tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { HeroSkillFormikShape } from "@/interfaces/HeroSkillInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
//Generated by GetControlOptionsImportLine
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
  //Generated by GetTableFieldCellInput
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: (cell) => <EditableTableCell {...cell} />,
    meta: {
      type: "Text",
      label: "Name",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
      />
    ),
    cell: (cell) => <EditableTableCell {...cell} />,
    meta: {
      type: "Select",
      label: "Type",
      options: CONTROL_OPTIONS["type"],
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cost"
      />
    ),
    cell: (cell) => <EditableTableCell {...cell} />,
    meta: {
      type: "Text",
      label: "Cost",
      width: 100,
      alignment: "right",
      isNumeric: true,
      isWholeNumber: true,
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
      />
    ),
    cell: (cell) => <EditableTableCell {...cell} />,
    meta: {
      type: "Textarea",
      label: "Description",
    },
    enableSorting: false,
  }, //Generated by GetTableFieldCellInput
  {
    accessorKey: "heroId",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Hero"
      />
    ),
    cell: (cell) => <EditableTableCell {...cell} />,
    meta: {
      type: "ComboBox",
      label: "Hero",
      alignment: "right", //Generated by Get_listNameFromRelationship
      listName: "hero-list",
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: (cell) => <DeleteRowColumn {...cell} />,
  },
];