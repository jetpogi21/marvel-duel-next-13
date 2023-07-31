"use client";

import { Input, InputProps } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState, RefObject } from "react";
import _ from "lodash";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ButtonProps } from "@/components/ui/Button";
import { BasicModel } from "@/interfaces/GeneralInterfaces";

export interface FormikSelectProps extends ButtonProps {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  helperText?: string;
  submitOnChange?: boolean;
  containerClassNames?: ClassValue[];
  options: BasicModel[];
}

export const FormikSelect: React.FC<FormikSelectProps> = ({
  containerClassNames = "",
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  submitOnChange = false,
  options,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value || "";
  const [internalVal, setInternalVal] = useState(fieldValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = meta.touched && meta.error;

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setArrayTouched && setArrayTouched();
    submitOnChange && submitForm();
  };

  const handleBlur = () => {
    internalVal && setArrayTouched && setArrayTouched();
    setValue(internalVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //@ts-ignore
      setValue(e.target.value);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  useEffect(() => {
    if (fieldValue !== internalVal) {
      setInternalVal(fieldValue);
    }
  }, [fieldValue]);

  useEffect(() => {
    if (inputRef && setFocusOnLoad) {
      inputRef.current?.focus();
    }
  }, [inputRef, setFocusOnLoad]);

  return (
    <div className={cn("flex flex-col w-full gap-1.5", containerClassNames)}>
      {!!label && <Label htmlFor={props.name}>{label}</Label>}
      <Select
        onValueChange={handleChange}
        defaultValue={fieldValue}
        value={fieldValue}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select a verified email to display"
            onBlur={handleBlur}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ id, name }) => (
            <SelectItem
              value={id.toString()}
              key={id}
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <span className="mt-1 text-xs font-bold text-muted-foreground">
          {helperText}
        </span>
      )}
      {hasError && <span className="text-xs text-red-500">{meta.error}</span>}
    </div>
  );
};
