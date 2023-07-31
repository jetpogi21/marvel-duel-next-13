"use client";

import { Input, InputProps } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState, RefObject } from "react";
import _ from "lodash";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

export interface FormikInputProps extends InputProps {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  helperText?: string;
  submitOnChange?: boolean;
  containerClassNames?: ClassValue[];
  isNumeric?: boolean;
  wholeNumberOnly?: boolean;
  allowNegative?: boolean;
}

export const FormikInput: React.FC<FormikInputProps> = ({
  containerClassNames = "",
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  submitOnChange = false,
  wholeNumberOnly = true,
  allowNegative = false,
  isNumeric = false,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value === 0 ? field.value : field.value || "";
  const [internalVal, setInternalVal] = useState(fieldValue);

  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = meta.touched && meta.error;

  let inputType = "text";
  if (isNumeric) {
    inputType = "number";
  }

  const handleTyping = () => {
    clearTimeout(typingTimer);

    const timer = setTimeout(() => {
      // Invoke the desired function or perform other actions here
      submitForm();
    }, 500);
    setTypingTimer(timer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    setInternalVal(targetValue);

    if (submitOnChange) {
      setValue(targetValue);
      handleTyping();
    }
    if (submitOnChange) {
      console.log(targetValue, submitOnChange);
      setValue(targetValue);
    }
  };

  const handleBlur = () => {
    internalVal && setArrayTouched && setArrayTouched();
    setValue(internalVal);
  };

  const isNumericInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    wholeNumberOnly: boolean,
    allowNegative: boolean
  ) => {
    const charCode = e.key.charCodeAt(0);

    // Allow numbers 0-9
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }

    // Allow backspace, tab, enter, escape, arrow keys, home, end, and minus (-)
    if (
      charCode === 8 || // Backspace
      charCode === 9 || // Tab
      charCode === 13 || // Enter
      charCode === 27 || // Escape
      (charCode >= 35 && charCode <= 40) || // Home, End, Arrow keys
      (allowNegative && charCode === 45) // Minus (-) if allowed
    ) {
      return true;
    }

    // Allow negative sign only at the start if it's allowed
    if (
      allowNegative &&
      e.currentTarget.selectionStart === 0 &&
      charCode === 45
    ) {
      return true;
    }

    // Prevent the period (decimal point) if wholeNumberOnly is true
    if (wholeNumberOnly && charCode === 46) {
      return false;
    }

    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //@ts-ignore
      setValue(e.target.value);
    }

    if (isNumeric && !isNumericInput(e, wholeNumberOnly, allowNegative)) {
      e.preventDefault();
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

  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  return (
    <div className={cn("flex flex-col w-full gap-1.5", containerClassNames)}>
      {!!label && <Label htmlFor={props.name}>{label}</Label>}
      <Input
        type={inputType}
        ref={propInputRef || inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={internalVal}
        {...props}
      />
      {helperText && (
        <span className="mt-1 text-xs font-bold text-muted-foreground">
          {helperText}
        </span>
      )}
      {hasError && <span className="text-xs text-red-500">{meta.error}</span>}
    </div>
  );
};
