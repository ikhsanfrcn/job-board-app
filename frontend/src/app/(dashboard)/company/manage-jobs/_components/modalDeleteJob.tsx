import { IJob } from "@/types/job";
import { Dialog } from "@headlessui/react";

interface IProps {
  deleteJob: IJob | null;
  setDeleteJob: React.Dispatch<React.SetStateAction<IJob | null>>;
  handleDelete: () => void;
}

export default function ModalDeleteJob({
  deleteJob,
  setDeleteJob,
  handleDelete,
}: IProps) {
  return (
    <Dialog
      open={!!deleteJob}
      onClose={() => setDeleteJob(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Delete Job</h3>
        <p>
          Are you sure you want to delete <strong>{deleteJob?.title}</strong>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setDeleteJob(null)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
}
