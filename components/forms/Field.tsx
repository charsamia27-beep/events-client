"use client";

import { Input, Label, TextArea, TextField } from "@heroui/react";
import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: ReactNode;
  min?: string;
  multiline?: boolean;
}

export function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  hint,
  min,
  multiline,
}: FieldProps) {
  return (
    <TextField className="field" isInvalid={Boolean(error)} name={name} onChange={onChange} type={type} value={value}>
      <Label className="field-label">{label}</Label>
      {multiline ? (
        <TextArea className="field-input field-textarea" placeholder={placeholder} rows={5} />
      ) : (
        <Input autoComplete={autoComplete} className="field-input" min={min} placeholder={placeholder} />
      )}
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </TextField>
  );
}
