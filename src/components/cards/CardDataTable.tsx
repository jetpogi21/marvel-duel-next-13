//Generated by WriteToModeldatatable_tsx - ModelDataTable.tsx
import { CardColumns } from "@/components/cards/CardColumns";
import { CardDeleteDialog } from "@/components/cards/CardDeleteDialog";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { useCardDeleteDialog } from "@/hooks/cards/useCardDeleteDialog";
import { useCardStore } from "@/hooks/cards/useCardStore";
import { useURL } from "@/hooks/useURL";
import {
  CardModel,
  CardSearchParams,
  GetCardsResponse,
} from "@/interfaces/CardInterfaces";
import { cn } from "@/lib/utils";
import {
  DEFAULT_SORT_BY,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/CardConstants";
import { getSorting } from "@/utils/utilities";
import { encodeParams } from "@/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

const CardDataTable: React.FC = () => {
  //URL States
  const { router, query, pathname } = useURL<CardSearchParams>();
  const sort = query["sort"] || DEFAULT_SORT_BY;

  //Local states

  const {
    resetRowSelection,
    rowSelection,
    setRowSelection,
    setRowSelectionToAll,
    page,
    recordCount,
    isUpdating,
    setPage,
    setCurrentData,
    lastPage,
    currentData,
  } = useCardStore((state) => ({
    resetRowSelection: state.resetRowSelection,
    rowSelection: state.rowSelection,
    setRowSelection: state.setRowSelection,
    setRowSelectionToAll: state.setRowSelectionToAll,
    page: state.page,
    recordCount: state.recordCount,
    isUpdating: state.isUpdating,
    setPage: state.setPage,
    setCurrentData: state.setCurrentData,
    lastPage: state.lastPage,
    currentData: state.currentData,
  }));
  const { setRecordsToDelete } = useCardDeleteDialog();

  //Page Constants

  //Tanstacks
  const {
    data: cardData,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<GetCardsResponse>(["cards"], { enabled: false });

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = cardData
    ? cardData.pages
        .slice(0, page)
        .reduce((prev, curr) => prev + curr.rows.length, 0)
    : 0;
  const pageStatus = `Showing ${dataRowCount} of ${recordCount} record(s)`;
  const hasPreviousPage = page > 1;
  const hasNextPage = dataRowCount < recordCount;

  //Utility Functions
  const getCurrentData = (page: number) => {
    return [
      ...cardData!.pages[page - 1].rows.map((item) => ({
        ...item
      })),
    ];
  };

  //Client Actions
  const deleteRow = (idx: number) => {
    const id = currentData[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = currentData
      .filter((_, idx) => indexes.includes(idx))
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === currentData.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(currentData.length);
    }
  };

  const goToPreviousPage = () => {
    if (cardData) {
      const newPage = page - 1;
      setPage(newPage);
      setCurrentData(getCurrentData(newPage));
      resetRowSelection();
    }
  };

  const goToNextPage = () => {
    if (cardData) {
      const newPage = page + 1;
      if (newPage <= lastPage) {
        setPage(newPage);
        setCurrentData(getCurrentData(newPage));
      } else {
        fetchNextPage();
      }
      resetRowSelection();
    }
  };

  const handleSortChange = (sortingState: SortingState) => {
    const sortParams = sortingState
      .map((item) => {
        if (item.desc) {
          return `-${item.id}`;
        } else {
          return `${item.id}`;
        }
      })
      .join(",");

    const params = { ...query, sort: sortParams };
    const newURL = `${pathname}?${encodeParams(params)}`;
    router.push(newURL);

    resetRowSelection();
  };

  const cardTable = useReactTable<CardModel>({
    data: currentData,
    columns: CardColumns,
    state: {
      sorting: sorting,
      rowSelection,
    },
    //@ts-ignore
    onRowSelectionChange: (state) => setRowSelection(state()),
    //@ts-ignore
    onSortingChange: (state) => handleSortChange(state()), //since the sort state is getting tracked from the url do handle instead
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    enableMultiRowSelection: true,
    meta: {
      name: PLURALIZED_MODEL_NAME,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      editable: false,
    },
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            {cardTable.getFilteredSelectedRowModel().rows.length} of{" "}
            {cardTable.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {hasSelected && (
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={() => {
                deleteSelectedRows();
              }}
            >
              Delete Selected
            </Button>
          )}
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "ml-auto"
            )}
            href="/cards/new"
          >
            Add New
          </Link>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {cardTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    //@ts-ignore
                    const customWidth = header.column.columnDef.meta?.width;
                    return (
                      <TableHead
                        key={header.id}
                        className={cn({
                          "w-[50px]": ["select", "actions"].includes(header.id),
                        })}
                        style={{
                          width: `${customWidth}px`,
                        }}
align={
                          (header.column.columnDef.meta as any)?.alignment ||
                          "left"
                        }
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
              {cardTable.getRowModel().rows?.length ? (
                cardTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={(cell.column.columnDef.meta as any)?.alignment}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={CardColumns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? "Fetching Data..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between flex-1 text-sm select-none text-muted-foreground">
          {!isLoading && (
            <div className="flex items-center justify-between w-full gap-4">
              <p className="hidden md:block">{pageStatus}</p>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  size={"sm"}
                  isLoading={isUpdating}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!hasPreviousPage}
                  onClick={() => goToPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!hasNextPage}
                  onClick={() => goToNextPage()}
                  isLoading={isFetching}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <CardDeleteDialog />
    </>
  );
};

export default CardDataTable;
