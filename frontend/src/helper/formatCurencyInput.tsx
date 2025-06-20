"use client";

import React from "react";
import { useFormikContext } from "formik";
import { formatCurrency, parseCurrency } from "./formatCurrency";

interface Props {
  name: string;
  className?: string;
  placeholder?: string;
}

export default function FormatCurrencyInput({
  name,
  className = "",
  placeholder,
}: Props) {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrency(e.target.value);
    setFieldValue(name, parsed);
  };

  const displayValue = formatCurrency(String(values[name] ?? ""));

  return (
    <input
      type="text"
      name={name}
      value={displayValue}
      onChange={handleChange}
      className={className}
      placeholder={placeholder || "Rp 0"}
      inputMode="numeric"
    />
  );
}
