//Generated by WriteToModelcolumns_tsx - ModelColumns.tsx
"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTable/DataTableColumnHeader";
import { EditableTableCell } from "@/components/ui/DataTable/EditableTableCell";
import { CardModel } from "@/interfaces/CardInterfaces";
import { DeleteRowColumn } from "@/components/ui/DataTable/DeleteRowColumn";
//Generated by GetControlOptionsImportLine - GetControlOptionsImportLine
import { CONTROL_OPTIONS } from "@/utils/constants/CardConstants";
//Generated by GetModelRowActionsImport - GetModelRowActionsImport
import { CardRowActions } from "@/components/cards/CardRowActions";
import { Lock } from "lucide-react";

const columnHelper = createColumnHelper<CardModel>();

export const CardColumns: ColumnDef<CardModel>[] = [
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
  //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "Text",
      label: "ID",
    },
    enableSorting: true,
  },
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
      );
    },
    meta: {
      type: "Text",
      label: "Name",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
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
        <EditableTableCell
          cell={cell}
          options={CONTROL_OPTIONS["type"]}
        />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "Select",
      label: "Type",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
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
      );
    },
    meta: {
      type: "Select",
      label: "Cost",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "battleStyle",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Battle Style"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={CONTROL_OPTIONS["battleStyle"]}
        />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "Select",
      label: "Battle Style",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "atk",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ATK"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "WholeNumber",
      label: "ATK",
    },
    enableSorting: true,
  }, //Generated by GetTableFieldCellInput - Editable Table Cell
  {
    accessorKey: "shield",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Shield"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell cell={cell} />
      ) : (
        //@ts-ignore
        cell.getValue()
      );
    },
    meta: {
      type: "WholeNumber",
      label: "Shield",
    },
    enableSorting: true,
  },
  //Generated by GetTableFieldCellInput - Editable Table Cell
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
        <>
          <div>{cell.row.original.description}</div>
          {cell.row.original.CardUnityCards.map((item) => {
            return (
              <>
                <div className="flex justify-center p-1 mt-2 text-center rounded-none r md:rounded-full bg-accent/80">
                  {item.CardUnity.cardCompositions}
                </div>
                <div className="pt-2">{item.description}</div>
              </>
            );
          })}
        </>
      );
    },
    meta: {
      type: "Textarea",
      label: "Description",
    },
    enableSorting: false,
  },
  columnHelper.display({
    id: "keywords",
    header: "Keywords",
    cell: (props) => {
      // Get the value of CardCardKeywords from the original row object
      const keywords = props.row.original.CardCardKeywords.map(
        (item) => item.CardKeyword?.name
      );
      // Join the elements of the array using a comma
      const keywordsString = keywords.join(", ");
      // Return the joined string as the cell value
      return keywordsString;
    },
  }),
  {
    accessorKey: "deckId",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Deck"
      />
    ),
    cell: (cell) => {
      return cell.table.options.meta?.editable ? (
        <EditableTableCell
          cell={cell}
          options={cell.table.options.meta?.options?.deckList || []}
        />
      ) : (
        <>
          <div>{cell.row.original.Deck.name}</div>
          {cell.row.original.LockedDeckCards.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center px-2 py-1 rounded-sm whitespace-nowrap bg-accent"
              >
                <Lock className="w-3 h-3 mr-1" /> {item.LockedDeck.name}
              </div>
            );
          })}
        </>
      );
    },
    meta: {
      type: "ComboBox",
      label: "Deck",
    },
    enableSorting: true,
  },
  {
    id: "actions",
    //cell component generated by GetActionCell
    cell: (cell) => <CardRowActions cell={cell} />,
  },
];
