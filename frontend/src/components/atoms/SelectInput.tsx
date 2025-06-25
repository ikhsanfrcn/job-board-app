import { Field, ErrorMessage } from "formik";

interface SelectInputWithHandlerProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  disabled?: boolean;
  onChange?: (option: any) => void;
}

export default function SelectInputWithHandler({
  label,
  name,
  options,
  value,
  disabled = false,
  onChange,
}: SelectInputWithHandlerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(opt => opt.value === selectedValue);
    if (onChange) {
      onChange(selectedOption || { value: selectedValue, label: selectedValue });
    }
  };

  return (
    <div>
      <label className="text-xs font-medium capitalize">{label}:</label>
      <Field
        as="select"
        name={name}
        className="border p-2 rounded w-full"
        disabled={disabled}
        value={value}
        onChange={handleChange}
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
