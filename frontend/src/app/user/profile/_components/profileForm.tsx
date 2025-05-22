"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import Resume from "./resume";
import Hero from "./hero";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { IUserProfile } from "@/types/userProfile";
import axios from "@/lib/axios";
import { normalizeProfile } from "@/helper/normalizerProfile";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Skeleton from "./skeleton";

interface IProps {
  profileData?: IUserProfile;
  onReload: () => void;
  fetchLoading?: boolean;
  token: string;
}

export default function ProfileForm({
  profileData: initialProfile,
  onReload,
  fetchLoading,
  token,
}: IProps) {
  if (fetchLoading || !initialProfile) {
    return (
      <div className="w-full h-full">
        <Skeleton />;
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<IUserProfile>(initialProfile);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: IUserProfile) => {
    try {
      setLoading(true);
      await axios.patch("/users/profile", normalizeProfile(values), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(values);
      setIsEditing(false);
      toast.success("Update Success !");
      onReload();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("Error Response:", err.response);
        toast.error(err.response?.data?.message || "Update Failed !");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero />

        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center mb-2 space-x-2">
              <h2 className="text-xl font-semibold">My Information</h2>
              {!isEditing && (
                <MdOutlineModeEdit
                  className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Update your personal details to keep your profile up to date.
            </p>

            {isEditing ? (
              <Formik
                initialValues={normalizeProfile(profileData)}
                validationSchema={userProfileSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ handleReset }) => (
                  <Form className="space-y-4 text-sm text-gray-800">
                    {[
                      { label: "Email", name: "email" },
                      { label: "Username", name: "username" },
                      { label: "First Name", name: "firstName" },
                      { label: "Last Name", name: "lastName" },
                      {
                        label: "Gender",
                        name: "gender",
                        as: "select",
                        options: ["Male", "Female", "PreferNotToSay"],
                      },
                      { label: "Date of Birth", name: "dob", type: "date" },
                      {
                        label: "Education",
                        name: "education",
                        as: "select",
                        options: [
                          "High School",
                          "Diploma",
                          "Associate Degree",
                          "Bachelor's Degree",
                          "Master's Degree",
                          "Doctorate (PhD)",
                          "Other",
                        ],
                      },
                      { label: "Country", name: "country" },
                      { label: "State", name: "state" },
                      { label: "City", name: "city" },
                      { label: "Zip Code", name: "zipCode" },
                      { label: "Region Number", name: "regionNumber" },
                      { label: "Phone Number", name: "phoneNumber" },
                    ].map(({ label, name, type = "text", as, options }) => (
                      <div key={name}>
                        <p className="text-xs font-medium">{label}</p>
                        {as === "select" ? (
                          <Field
                            as="select"
                            name={name}
                            className="mt-1 border border-gray-300 rounded px-4 py-2 w-full text-sm"
                          >
                            <option value="">Select {label}</option>
                            {options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            type={type}
                            name={name}
                            className="mt-1 border border-gray-300 rounded px-4 py-2 w-full text-sm"
                          />
                        )}
                        <ErrorMessage
                          name={name}
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    ))}

                    <div className="flex justify-between mt-6 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleReset();
                          setIsEditing(false);
                        }}
                        className="w-full border border-black px-4 py-2 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 rounded text-white transition ${
                          loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gray-400 hover:bg-gray-600"
                        }`}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="space-y-4 text-sm text-gray-800">
                {Object.entries(profileData).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="mt-1">{value || "-"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Resume />
      </div>
    </div>
  );
}