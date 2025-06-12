import { Field, ErrorMessage } from "formik";

interface Props {
  name: string;
  label: string;
  rows?: number;
}

export default function TextAreaInput({ name, label, rows = 3 }: Props) {
  return (
    <div>
      <label className="text-xs font-medium capitalize">{label}:</label>
      <Field
        as="textarea"
        name={name}
        rows={rows}
        className="border p-2 rounded w-full"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
