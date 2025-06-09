import { Field, FieldArray } from "formik";

export default function CreateAdditional({ values }: any) {
  return (
    <FieldArray name="additional">
      {({ push, remove }) => (
        <div>
          <h3 className="font-semibold">Additional</h3>
          {values.additional.length === 0 && (
            <p className="text-gray-500">No additional items added yet.</p>
          )}
          {values.additional.map((_: any, index: number) => (
            <div key={index} className="border p-3 mb-2 rounded">
              <Field
                as="select"
                name={`additional[${index}].category`}
                className="w-full p-1 border mb-1"
              >
                <option value="TECHNICAL">Technical</option>
                <option value="LANGUAGE">Language</option>
                <option value="INTERPERSONAL">Interpersonal</option>
              </Field>
              {/* Render items dynamically */}
              <FieldArray name={`additional[${index}].items`}>
                {({ push: pushItem, remove: removeItem, form }) => (
                  <div>
                    {form.values.additional[index].items.map(
                      (_: string, itemIndex: number) => (
                        <div key={itemIndex} className="flex gap-2 mb-1">
                          <Field
                            name={`additional[${index}].items[${itemIndex}]`}
                            placeholder={`Item ${itemIndex + 1}`}
                            className="w-full p-1 border"
                          />
                          <button
                            type="button"
                            onClick={() => removeItem(itemIndex)}
                            className="text-red-500"
                          >
                            X
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => pushItem("")}
                      className="text-blue-600"
                    >
                      + Add Item
                    </button>
                  </div>
                )}
              </FieldArray>
              <Field
                name={`additional[${index}].description`}
                placeholder="Description"
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
                category: "TECHNICAL",
                items: [""],
                description: "",
              })
            }
            className="text-blue-600"
          >
            + Add Additional
          </button>
        </div>
      )}
    </FieldArray>
  );
}
