import "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    name: string;
    setTouchedRows: (idx: number) => void;
    addRow: () => void;
    deleteRow: (idx: number) => void;
    toggleRow: (idx: number) => void;
    toggleSelectAllRow: () => void;
    ref: React.RefObject<HTMLElement>;
    firstFieldInForm: string;
    lastFieldInForm: string;
  }
}
