import { FormikCheckbox } from "@/components/formik/FormikCheckbox";
import { FormikInput } from "@/components/formik/FormikInput";
import { FormikTextArea } from "@/components/formik/FormikTextArea";
import { CellContext } from "@tanstack/react-table";
import { RefObject } from "react";

// Define a custom type for the column definition meta
type ColumnDefMeta = {
  type: "Textarea" | "Checkbox" | "Input";
};

export const EditableTableCell = <TData, TValue>(
  cell: CellContext<TData, unknown>
) => {
  const { getValue, row, column, table } = cell;

  const dataRows = table.getFilteredRowModel().rows.length;

  // Use type assertion to access the column definition meta
  const type = (column.columnDef.meta as ColumnDefMeta).type;

  const {
    name,
    setTouchedRows,
    addRow,
    ref,
    firstFieldInForm,
    lastFieldInForm,
  } = table.options.meta || {};

  const index = row.index;
  const controlName = `${name}[${index}].${column.id}`;

  // Define a common function to handle the key down event
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") {
      setTouchedRows && setTouchedRows(row.index);
    }

    if (e.key === "Tab") {
      if (dataRows === index + 1 && column.id === lastFieldInForm) {
        e.preventDefault();
        addRow && addRow();
      }
    }
  };

  // Define a common prop object for the formik components
  const commonProps = {
    name: controlName,
    onKeyDown: handleKeyDown,
  };

  // Return the appropriate formik component based on the type
  switch (type) {
    case "Textarea":
      return (
        <FormikTextArea
          {...commonProps}
          inputRef={
            dataRows === index + 1 && column.id === firstFieldInForm
              ? (ref as RefObject<HTMLTextAreaElement>)
              : undefined
          }
        />
      );

    case "Checkbox":
      return (
        <FormikCheckbox
          {...commonProps}
          inputRef={
            dataRows === index + 1 && column.id === firstFieldInForm
              ? (ref as RefObject<HTMLButtonElement>)
              : undefined
          }
        />
      );

    default:
      return (
        <FormikInput
          {...commonProps}
          inputRef={
            dataRows === index + 1 && column.id === firstFieldInForm
              ? (ref as RefObject<HTMLInputElement>)
              : undefined
          }
        />
      );
      break;
  }
};
