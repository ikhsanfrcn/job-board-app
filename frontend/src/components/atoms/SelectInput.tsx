import { Field, ErrorMessage, useFormikContext } from "formik";

interface SelectInputProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  onChange?: (value: string) => void; // hanya kirim value, lebih simpel
}

export default function SelectInput({
  label,
  name,
  options,
  disabled = false,
  onChange,
}: SelectInputProps) {
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <label className="text-xs font-medium capitalize">{label}:</label>
      <Field
        as="select"
        name={name}
        className="border p-2 rounded w-full"
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue(name, e.target.value);

          if (onChange) {
            onChange(e.target.value);
          }
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
