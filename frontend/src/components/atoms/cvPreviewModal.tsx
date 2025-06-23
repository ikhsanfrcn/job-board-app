"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiX } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

interface CvPreviewModalProps {
  url: string;
  onClose: () => void;
}

export default function CvPreviewModal({ url, onClose }: CvPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 z-50 text-white bg-gray-900/80 hover:bg-gray-800 focus:outline-none rounded-full p-2 transition cursor-pointer"
                  aria-label="Close CV preview"
                >
                  <BiX className="text-2xl" />
                </button>

                {isLoading && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80">
                    <ImSpinner2 className="text-gray-500 text-4xl animate-spin" />
                  </div>
                )}

                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    url
                  )}&embedded=true`}
                  className="w-full h-full"
                  title="CV Preview"
                  onLoad={() => setIsLoading(false)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
