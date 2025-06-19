/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldArray } from "formik";

export default function CreateLeadership({ values }: any) {
  return (
    <FieldArray name="leadership">
      {({ push, remove }) => (
        <div>
          <h3 className="font-semibold">Leadership</h3>
          {values.leadership.length === 0 && (
            <p className="text-gray-500">No leadership roles added yet.</p>
          )}
          {values.leadership.map((_: any, index: number) => (
            <div key={index} className="border p-3 mb-2 rounded">
              <Field
                name={`leadership[${index}].organization`}
                placeholder="Organization"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`leadership[${index}].role`}
                placeholder="Role"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`leadership[${index}].description`}
                placeholder="Description"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`leadership[${index}].startDate`}
                type="date"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`leadership[${index}].endDate`}
                type="date"
                className="w-full p-1 border mb-1"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              push({
                id: "",
                organization: "",
                role: "",
                description: "",
                startDate: "",
                endDate: "",
              })
            }
            className="text-blue-600"
          >
            + Add Leadership
          </button>
        </div>
      )}
    </FieldArray>
  );
}
