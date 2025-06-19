/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "formik";

interface IProps {
  touched: any;
  errors: any;
}

export default function CreateSummary({ touched, errors }: IProps) {
  return (
    <div>
      <label htmlFor="summary">Summary</label>
      <Field
        id="summary"
        name="summary"
        as="textarea"
        className="border p-2 w-full"
      />
      {touched && errors && (
        <div className="text-red-500">{errors}</div>
      )}
    </div>
  );
}
