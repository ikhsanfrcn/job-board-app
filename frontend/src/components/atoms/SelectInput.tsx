/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ErrorMessage } from "formik";

interface SelectInputProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  disabled?: boolean;
  onChange?: (option: any) => void;
}

export default function SelectInput({
  label,
  name,
  options,
  value,
  disabled = false,
  onChange,
}: SelectInputProps) {
  return (
    <div>
      <label className="text-xs font-medium capitalize">{label}:</label>
      <Field
        as="select"
        name={name}
        className="border p-2 rounded w-full"
        value={value}
        disabled={disabled}
         onChange={(e: { target: { value: any; }; }) => {
          const selectedValue = e.target.value;
          const selectedOption = options.find((opt) => opt.value === selectedValue);
          if (onChange) onChange(selectedOption || { value: selectedValue, label: selectedValue });
        }}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
