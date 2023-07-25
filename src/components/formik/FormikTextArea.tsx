"use client";

import { Label } from "@/components/ui/Label";
import { useField } from "formik";
import {
  useEffect,
  useRef,
  useState,
  RefObject,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import _ from "lodash";
import { Textarea, TextareaProps } from "@/components/ui/Textarea";

export interface FormikTextAreaProps extends TextareaProps {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLTextAreaElement> | undefined;
  helperText?: string;
}

export const FormikTextArea: React.FC<FormikTextAreaProps> = ({
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value || "";
  const [internalVal, setInternalVal] = useState(fieldValue);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasError = meta.touched && meta.error;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const targetValue = e.target.value;
    setInternalVal(targetValue);
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
    internalVal && setArrayTouched && setArrayTouched();
    setValue(internalVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="grid w-full gap-1.5">
      {!!label && <Label htmlFor={props.name}>{label}</Label>}
      <Textarea
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
