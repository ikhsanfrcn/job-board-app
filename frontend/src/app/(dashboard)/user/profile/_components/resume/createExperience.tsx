import { Field, FieldArray } from "formik";

export default function CreateExperience({ values }: any) {
  return (
    <FieldArray name="workExperience">
      {({ push, remove }) => (
        <div>
          <h3 className="font-semibold">Work Experience</h3>
          {values.workExperience.length === 0 && (
            <p className="text-gray-500">No work experience added yet.</p>
          )}
          {values.workExperience.map((_: any, index: number) => (
            <div key={index} className="border p-3 mb-2 rounded">
              <Field
                name={`workExperience[${index}].company`}
                placeholder="Company"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`workExperience[${index}].description`}
                placeholder="Description"
                className="w-full p-1 border mb-1"
              />
              <Field
                as="select"
                name={`workExperience[${index}].employmentType`}
                className="w-full p-1 border mb-1"
              >
                <option value="">Select Employment Type</option>
                <option value="FULLTIME">Full Time</option>
                <option value="PARTTIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="FREELANCE">Freelance</option>
                <option value="SELFEMPLOYED">Self Employed</option>
                <option value="INTERN">Intern</option>
              </Field>
              <Field
                name={`workExperience[${index}].startDate`}
                type="date"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`workExperience[${index}].endDate`}
                type="date"
                className="w-full p-1 border mb-1"
              />
              <Field
                name={`workExperience[${index}].jobdesc.name`}
                placeholder="Job Title"
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
                company: "",
                description: "",
                employmentType: "",
                startDate: "",
                endDate: "",
                jobdesc: { name: "" },
              })
            }
            className="text-blue-600"
          >
            + Add Experience
          </button>
        </div>
      )}
    </FieldArray>
  );
}
