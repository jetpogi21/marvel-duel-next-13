//Generated by WriteToModelformarray_tsx - ModelFormArray.tsx
import { DeckColumns } from "@/components/decks/DeckColumns";
import { DeckMultiCreateDeleteDialog } from "@/components/decks/DeckMultiCreateDeleteDialog";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { useDeckDeleteDialog } from "@/hooks/decks/useDeckDeleteDialog";
import { useDeckStore } from "@/hooks/decks/useDeckStore";
import { useURL } from "@/hooks/useURL";
import {
  DeckFormikShape,
  DeckSearchParams,
  GetDecksResponse,
} from "@/interfaces/DeckInterfaces";
import { cn } from "@/lib/utils";
import {
  DEFAULT_FORM_VALUE,
  DEFAULT_SORT_BY,
  FIRST_FIELD_IN_FORM,
  LAST_FIELD_IN_FORM,
  PLURALIZED_MODEL_NAME,
} from "@/utils/constants/DeckConstants";
import { getSorting } from "@/utils/utilities";
import { encodeParams, removeItemsByIndexes } from "@/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Form, FormikProps } from "formik";
import { ChevronLast, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DeckFormArrayProps {
  formik: FormikProps<{ Decks: DeckFormikShape[] }>;
}

const DeckFormArray: React.FC<DeckFormArrayProps> = ({ formik }) => {
  //URL States
  const { router, query, pathname } = useURL<DeckSearchParams>();
  const sort = query["sort"] || DEFAULT_SORT_BY;

  //Local states
  const [willFocus, setWillFocus] = useState(false);
  const ref: React.RefObject<HTMLElement> = useRef(null); //to be attached to the last row in form, first control in that row

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
  } = useDeckStore();
  const { setRecordsToDelete } = useDeckDeleteDialog();

  //Page Constants
  const DEFAULT_DECK = DEFAULT_FORM_VALUE;

  //Tanstacks
  const {
    data: deckData,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<GetDecksResponse>(["decks"], { enabled: false });

  //Transformations
  const sorting = getSorting(sort);
  const hasSelected = Object.values(rowSelection).some((val) => val);
  const dataRowCount = deckData
    ? deckData.pages
        .slice(0, page)
        .reduce((prev, curr) => prev + curr.rows.length, 0)
    : 0;
  const pageStatus = `Showing ${dataRowCount} of ${recordCount} record(s)`;
  const hasPreviousPage = page > 1;
  const hasNextPage = dataRowCount < recordCount;

  //Utility Functions
  const getCurrentData = (page: number) => {
    return [
      ...deckData!.pages[page - 1].rows.map((item, index) => ({
        ...item,
        index,
        touched: false,
      })),
      {
        ...DEFAULT_DECK,
        index: deckData!.pages[page - 1].rows.length,
      },
    ];
  };

  //Client Actions
  const focusOnRef = () => {
    ref && ref.current?.focus();
  };

  const addRow = () => {
    formik.setFieldValue(`Decks`, [
      ...formik.values.Decks.map((item) => ({ ...item })),
      { ...DEFAULT_DECK },
    ]);
    setWillFocus(true);
  };

  const setTouchedRows = (idx: number) => {
    formik.setFieldValue(`Decks[${idx}].touched`, true);
  };

  const deleteRow = (idx: number) => {
    const id = formik.values.Decks[idx].id;

    if (id) {
      setRecordsToDelete([id.toString()]);
    } else {
      formik.setFieldValue(`Decks`, [
        ...formik.values.Decks.slice(0, idx),
        ...formik.values.Decks.slice(idx + 1),
      ]);
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const deleteSelectedRows = () => {
    const indexes = Object.keys(rowSelection).map((item) => parseInt(item));

    //Compute the Ids to be deleted. the index should be the selected indexes. then see if the rows has an actual id value
    const deletedIDs = formik.values.Decks.filter((_, idx) =>
      indexes.includes(idx)
    )
      .filter((item) => !!item.id)
      .map((item) => item.id.toString());

    if (deletedIDs.length > 0) {
      setRecordsToDelete(deletedIDs);
    } else {
      formik.setFieldValue(
        `Decks`,
        removeItemsByIndexes(formik.values.Decks, indexes)
      );
      formik.setErrors({});
      resetRowSelection();
    }
  };

  const toggleRow = (idx: number) => setRowSelection(idx);
  const toggleSelectAllRow = () => {
    if (Object.keys(rowSelection).length === formik.values.Decks.length) {
      resetRowSelection();
    } else {
      setRowSelectionToAll(formik.values.Decks.length);
    }
  };

  const goToPreviousPage = () => {
    if (deckData) {
      const newPage = page - 1;
      setPage(newPage);
      setCurrentData(getCurrentData(newPage));
      resetRowSelection();
    }
  };

  const goToNextPage = () => {
    if (deckData) {
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

  const deckTable = useReactTable<DeckFormikShape>({
    data: formik.values.Decks,
    columns: DeckColumns,
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
      setTouchedRows,
      addRow,
      deleteRow,
      toggleRow,
      toggleSelectAllRow,
      firstFieldInForm: FIRST_FIELD_IN_FORM,
      lastFieldInForm: LAST_FIELD_IN_FORM,
      ref,
      editable: true,
      options: {},
    },
  });

  //useEffects here
  useEffect(() => {
    if (willFocus) {
      focusOnRef();
    }
  }, [formik.values.Decks]);

  return (
    <Form
      autoComplete="off"
      noValidate
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            {deckTable.getFilteredSelectedRowModel().rows.length} of{" "}
            {deckTable.getFilteredRowModel().rows.length} row(s) selected.
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
          <Button
            className="ml-auto"
            type="button"
            size="sm"
            onClick={focusOnRef}
          >
            <ChevronLast className="w-4 h-4 text-green-800" /> Go to last row
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {deckTable.getHeaderGroups().map((headerGroup) => (
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
                        className="p-2"
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
                    colSpan={DeckColumns.length}
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
                  type="button"
                  size="sm"
                  onClick={addRow}
                >
                  <Plus className="w-4 h-4 text-green-800" /> Add Row
                </Button>
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
      <DeckMultiCreateDeleteDialog />
    </Form>
  );
};

export default DeckFormArray;
