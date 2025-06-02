interface IModalCreateTestProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export default function ModalCreateTest({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
}: IModalCreateTestProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 font-sans">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Pre Test</h2>
        <p className="text-gray-600 mb-6">
          Do you want to create a pre-test for the job "{jobTitle}"?<br/><span className="text-sm italic">Note: You can only create the test once.</span>
        </p>
        <div className="flex gap-5 justify-center">
          <button
            onClick={onClose}
            className="px-7 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-7 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}