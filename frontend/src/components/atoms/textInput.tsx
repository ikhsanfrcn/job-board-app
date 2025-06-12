import { Field, ErrorMessage } from "formik";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  readOnly?: boolean;
}

export default function TextInput({
  label,
  name,
  type = "text",
  readOnly = false,
}: TextInputProps) {
  return (
    <div>
      <label className="text-xs font-medium capitalize">{label}:</label>
      <Field
        name={name}
        type={type}
        className={`border p-2 rounded w-full ${readOnly ? "bg-gray-100" : ""}`}
        readOnly={readOnly}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
