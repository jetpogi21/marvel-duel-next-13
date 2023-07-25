import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { flexRender } from "@tanstack/react-table";
import React from "react";

interface DeckTableProps {
  deckTable: any; // I don't know the exact type of deckTable, so I use any for now
}

const DeckTable: React.FC<DeckTableProps> = ({ deckTable }) => {
  return (
    <Table>
      <TableHeader>
        {deckTable.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              //@ts-ignore
              const width = header.column.columnDef.meta?.width;
              return (
                <TableHead
                  key={header.id}
                  className={
                    ["select", "actions"].includes(header.id) ? "w-[50px]" : ""
                  }
                  style={{ width: `${width}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {deckTable.getRowModel().rows?.length ? (
          deckTable.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="align-top"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={deckTable.columns.length} // you can use deckTable.columns.length to get the number of columns
              className="h-24 text-center"
            >
              {"No results."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DeckTable;
