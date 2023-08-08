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
import { DeckFormikShape, DeckModel } from "@/interfaces/DeckInterfaces";
import Link from "next/link";
import { useDeckStore } from "@/hooks/decks/useDeckStore";
import { useState } from "react";

interface DeckRowActionsProps<TData, TValue> {
  cell: CellContext<TData, TValue>;
}

export function DeckRowActions<TData, TValue>({
  cell,
}: DeckRowActionsProps<TData, TValue>) {
  //local state
  const [open, setOpen] = useState(false);

  //Variables from cell
  const rowData = cell.row.original as DeckFormikShape;

  //@ts-ignore
  const { currentData }: { currentData: DeckModel[] } = useDeckStore(
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
        <DropdownMenuTrigger>
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
              deleteRow(index);
            }}
          >
            Delete
          </DropdownMenuItem>
          <Link href={`/decks/${slug}`}>
            <DropdownMenuItem>Edit/View Skills</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
