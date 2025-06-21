"use client";

import { IUserProfile } from "@/types/userProfile";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiPhone, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

interface IProps {
  userDetail: IUserProfile;
  onClose: () => void;
}

export default function UserDetailModal({ userDetail, onClose }: IProps) {
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
          <div className="flex min-h-full items-center justify-center px-4 py-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none rounded-full p-1 cursor-pointer"
                  aria-label="Close"
                >
                  <AiOutlineClose size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                  User Profile
                </Dialog.Title>

                <div className="w-full flex flex-wrap items-center">
                  <div className="w-full flex justify-center md:w-1/3 mb-5">
                    <Image
                      src={userDetail.avatar}
                      alt={`${userDetail.firstName} ${userDetail.lastName}`}
                      width={150}
                      height={150}
                      className="rounded-full object-cover border shadow-md"
                    />
                  </div>

                  <div className="w-full md:w-2/3 space-y-2 text-gray-700">
                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                      <BiUser className="text-lg" /> {userDetail.firstName}{" "}
                      {userDetail.lastName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MdEmail className="text-lg" /> {userDetail.email}
                    </div>
                    {userDetail.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BiPhone className="text-lg" /> {userDetail.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t my-6" />

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                    {userDetail.gender && (
                      <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-medium">{userDetail.gender}</p>
                      </div>
                    )}
                    {userDetail.dob && (
                      <div>
                        <p className="text-gray-500">Date of Birth</p>
                        <p className="font-medium">
                          {new Date(userDetail.dob).toLocaleString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    {userDetail.education && (
                      <div>
                        <p className="text-gray-500">Education</p>
                        <p className="font-medium">{userDetail.education}</p>
                      </div>
                    )}
                    {userDetail.country && (
                      <div>
                        <p className="text-gray-500">Country</p>
                        <p className="font-medium">{userDetail.country}</p>
                      </div>
                    )}
                    {userDetail.state && (
                      <div>
                        <p className="text-gray-500">State</p>
                        <p className="font-medium">{userDetail.state}</p>
                      </div>
                    )}
                    {userDetail.city && (
                      <div>
                        <p className="text-gray-500">City</p>
                        <p className="font-medium">{userDetail.city}</p>
                      </div>
                    )}
                    {userDetail.zipCode && (
                      <div>
                        <p className="text-gray-500">Zip Code</p>
                        <p className="font-medium">{userDetail.zipCode}</p>
                      </div>
                    )}
                    {userDetail.regionNumber && (
                      <div>
                        <p className="text-gray-500">Region Number</p>
                        <p className="font-medium">{userDetail.regionNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
