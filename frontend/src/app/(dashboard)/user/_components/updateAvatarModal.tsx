"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  onUpload: () => void;
}

export default function UpdateAvatarModal({
  isOpen,
  onClose,
  selectedFile,
  setSelectedFile,
  onUpload,
}: IProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900"
                >
                  Update Avatar
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {selectedFile && (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedFile(file);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => {
                      setSelectedFile(null);
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={onUpload}
                    disabled={!selectedFile}
                  >
                    Upload
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
