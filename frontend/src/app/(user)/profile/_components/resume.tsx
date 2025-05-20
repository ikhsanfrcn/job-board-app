import { BsUpload } from "react-icons/bs";

export default function Resume() {
  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-2">Resume</h2>
      <p className="text-sm text-gray-600 mb-5">
        Pre-fill job applications when you add a resume and use Easy Apply.
      </p>
      <p className="text-sm text-gray-600">
        Your resume can be visible to hiring employers or you can keep it
        hidden. See the Privacy Policy for more info.
      </p>
      <div className="w-full p-4 border border-dashed border-gray-300 rounded-lg mt-5">
        <div className="flex items-center space-x-4">
          <BsUpload className="text-3xl text-gray-600" />
          <div>
            <p className="text-xl font-semibold">Upload Resume</p>
            <p className="text-xs text-gray-600 font-base">
              Use a pdf, docx, doc, rtf or txt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
