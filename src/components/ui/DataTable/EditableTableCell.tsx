import { FormikCheckbox } from "@/components/formik/FormikCheckbox";
import { FormikCombobox } from "@/components/formik/FormikCombobox";
import { FormikInput } from "@/components/formik/FormikInput";
import { FormikSelect } from "@/components/formik/FormikSelect";
import { FormikTextArea } from "@/components/formik/FormikTextArea";
import useHeroList from "@/hooks/heroes/useHeroList";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { CellContext } from "@tanstack/react-table";
import { RefObject } from "react";

// Define a custom type for the column definition meta
type ColumnDefMeta = {
  type: "Textarea" | "Checkbox" | "Input" | "Select" | "ComboBox";
  options: BasicModel[];
  listName: string;
  isNumeric: boolean;
  isWholeNumber: boolean;
  label: string;
};

export const EditableTableCell = <TData, TValue>(
  cell: CellContext<TData, unknown>
) => {
  const { getValue, row, column, table } = cell;

  const dataRows = table.getFilteredRowModel().rows.length;

  // Use type assertion to access the column definition meta
  const type = (column.columnDef.meta as ColumnDefMeta).type;
  const options = (column.columnDef.meta as ColumnDefMeta).options;
  const listName = (column.columnDef.meta as ColumnDefMeta).listName;
  const isNumeric = (column.columnDef.meta as ColumnDefMeta).isNumeric;
  const isWholeNumber = (column.columnDef.meta as ColumnDefMeta).isWholeNumber;
  const label = (column.columnDef.meta as ColumnDefMeta).label;

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
          placeholder={label}
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
    case "Select":
      return (
        <FormikSelect
          {...commonProps}
          options={options}
          showLabel={false}
          allowBlank={false}
        />
      );
    case "ComboBox":
      const { data } = useHeroList();

      return (
        <FormikCombobox
          {...commonProps}
          freeSolo={false}
          items={data || []}
          label={label}
          showLabel={false}
        />
      );
    default:
      return (
        <FormikInput
          placeholder={label}
          isNumeric={isNumeric}
          wholeNumberOnly={isWholeNumber}
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
