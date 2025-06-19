/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldArray } from "formik";

export default function CreateEducation({ values }: any) {
  return (
    <FieldArray name="education">
      {({ push, remove }) => (
        <div>
          <h3 className="font-semibold">Education</h3>
          {values.education.length === 0 && (
            <p className="text-gray-500">No education added yet.</p>
          )}
          {values.education.map((_: any, index: number) => (
            <div key={index} className="border p-3 mb-2 rounded">
              <Field
                name={`education[${index}].schoolName`}
                placeholder="School"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`education[${index}].degree`}
                placeholder="Degree"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`education[${index}].fieldOfStudy`}
                placeholder="Field of Study"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`education[${index}].startDate`}
                type="date"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`education[${index}].endDate`}
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
                schoolName: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
              })
            }
            className="text-blue-600"
          >
            + Add Education
          </button>
        </div>
      )}
    </FieldArray>
  );
}
