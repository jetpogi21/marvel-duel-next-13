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
import {
  CardUnityFormikShape,
  CardUnityModel,
} from "@/interfaces/CardUnityInterfaces";
import Link from "next/link";
import { useCardUnityStore } from "@/hooks/card-unities/useCardUnityStore";
import { useState } from "react";

interface CardUnityRowActionsProps<TData, TValue> {
  cell: CellContext<TData, TValue>;
}

export function CardUnityRowActions<TData, TValue>({
  cell,
}: CardUnityRowActionsProps<TData, TValue>) {
  //local state
  const [open, setOpen] = useState(false);

  //Variables from cell
  const rowData = cell.row.original as CardUnityFormikShape;

  //@ts-ignore
  const { currentData }: { currentData: CardUnityModel[] } = useCardUnityStore(
    (state) => ({
      currentData: state.currentData,
    })
  );

  const id = rowData.id;
  const slug = currentData.find((item) => item.id === id)?.id;

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
              deleteRow && deleteRow(index);
            }}
          >
            Delete
          </DropdownMenuItem>
          <Link href={`/card-unities/${slug}`}>
            <DropdownMenuItem>Edit/View Card Unity Details</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
