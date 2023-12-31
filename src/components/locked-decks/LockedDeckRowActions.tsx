//Generated by WriteToModelrowactions_tsx - ModelRowActions.tsx
"use client";

import { CellContext } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import { LockedDeckFormikShape, LockedDeckModel } from "@/interfaces/LockedDeckInterfaces";
import Link from "next/link";
import { useLockedDeckStore } from "@/hooks/locked-decks/useLockedDeckStore";
import { useState } from "react";

interface LockedDeckRowActionsProps<TData, TValue> {
  cell: CellContext<TData, TValue>;
}

export function LockedDeckRowActions<TData, TValue>({
  cell,
}: LockedDeckRowActionsProps<TData, TValue>) {
  //local state
  const [open, setOpen] = useState(false);

  //Variables from cell
  const rowData = cell.row.original as LockedDeckFormikShape;

  //@ts-ignore
  const { currentData }: { currentData: LockedDeckModel[] } = useLockedDeckStore(
    (state) => ({
      currentData: state.currentData,
    })
  );

  const id = rowData.id;
  const slug = currentData.find((item) => item.id === id)?.slug;

  const index = cell.row.index;

  //Varuables from table meta
  //@ts-ignore
  const deleteRow = cell.table.options.meta.deleteRow;

  //Transformations
  const isHidden = !rowData.id;

  return (
    !isHidden && (
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-8 h-8 p-0"
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onPointerDownOutside={() => {
            setOpen(false);
          }}
        >
          <DropdownMenuItem
            onSelect={() => {
              setOpen(false);
              deleteRow && deleteRow(index);
            }}
          >
            Delete
          </DropdownMenuItem>
          <Link href={`/locked-decks/${slug}`}>
            <DropdownMenuItem>Edit/View Locked Deck Details</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
