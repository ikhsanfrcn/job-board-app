"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface Props {
  applicationId: string;
  onClose: () => void;
  onSubmit: (data: {
    applicationId: string;
    date: string;
    time: string;
    location: string;
  }) => void;
}

export default function InterviewScheduleModal({
  applicationId,
  onClose,
  onSubmit,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!date || !time || !location) return alert("Please fill all fields.");
    onSubmit({ applicationId, date, time, location });
  };

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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                  Schedule Interview
                </Dialog.Title>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="e.g. Zoom, Google Meet, Office"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Create
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
