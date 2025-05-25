import { IJob } from "@/types/job";
import { Dialog } from "@headlessui/react";

interface IProps {
  editJob: IJob | null;
  setEditJob: React.Dispatch<React.SetStateAction<IJob | null>>;
  handleEditSave: (updatedJob: IJob) => void;
}

export default function ModalEditJob({
  editJob,
  setEditJob,
  handleEditSave,
}: IProps) {
  return (
    <Dialog
      open={!!editJob}
      onClose={() => setEditJob(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Edit Job</h3>
        {editJob && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;

              const updatedJob: IJob = {
                ...editJob,
                title: (form.elements.namedItem("title") as HTMLInputElement)
                  .value,
                description: (
                  form.elements.namedItem("description") as HTMLInputElement
                ).value,
                city: (form.elements.namedItem("city") as HTMLInputElement)
                  .value,
                category: (
                  form.elements.namedItem("category") as HTMLInputElement
                ).value,
                tags: (
                  form.elements.namedItem("tags") as HTMLInputElement
                ).value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
                salary: (form.elements.namedItem("salary") as HTMLInputElement)
                  .value,
                deadline: (
                  form.elements.namedItem("deadline") as HTMLInputElement
                ).value,
                isPublished: (
                  form.elements.namedItem("isPublished") as HTMLInputElement
                ).checked,
              };

              handleEditSave(updatedJob);
            }}
            className="space-y-4"
          >
            <input
              name="title"
              defaultValue={editJob.title}
              className="w-full border px-3 py-2 rounded"
              placeholder="Job Title"
              required
            />
            <textarea
              name="description"
              defaultValue={editJob.description}
              className="w-full border px-3 py-2 rounded"
              placeholder="Description"
              rows={3}
            />
            <input
              name="city"
              defaultValue={editJob.city}
              className="w-full border px-3 py-2 rounded"
              placeholder="City"
            />
            <input
              name="category"
              defaultValue={editJob.category}
              className="w-full border px-3 py-2 rounded"
              placeholder="Category"
            />
            <input
              name="tags"
              defaultValue={editJob.tags.join(", ")}
              className="w-full border px-3 py-2 rounded"
              placeholder="Tags (comma separated)"
            />
            <input
              name="salary"
              defaultValue={editJob.salary}
              className="w-full border px-3 py-2 rounded"
              placeholder="Salary"
              type="number"
            />
            <input
              name="deadline"
              defaultValue={editJob.deadline}
              className="w-full border px-3 py-2 rounded"
              type="date"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                defaultChecked={editJob.isPublished}
              />
              <span>Published</span>
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditJob(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}
