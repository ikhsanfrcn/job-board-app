"use client";

import { Formik, Form } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { normalizeProfile } from "@/helper/normalizerUserProfile";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { IUserProfile } from "@/types/userProfile";
import ProfileFormFields from "./profileFormFields";


interface IProps {
  profile: IUserProfile;
  token?: string;
  setProfile: (profile: IUserProfile) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export default function ProfileForm({
  profile,
  token,
  setProfile,
  setIsEditing,
}: IProps) {
  const [provinceValue, setProvinceValue] = useState(profile.state);

  const handleSubmit = async (values: IUserProfile) => {
    try {
      const updatedValues = { ...values, state: values.state };
      const { data } = await axios.patch(
        "/users/profile",
        normalizeProfile(updatedValues),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data.user);
      setIsEditing(false);
      toast.success("Update Success!");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Update Failed!");
      }
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={normalizeProfile(profile)}
      validationSchema={userProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4 text-sm text-gray-800">
          <ProfileFormFields
            setFieldValue={(field, value) => {
              if (field === "state") setProvinceValue(value);
              setFieldValue(field, value);
            }}
            provinceValue={provinceValue}
          />

          <div className="flex justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full border border-black px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full text-white px-4 py-2 border rounded bg-gray-400 hover:bg-gray-600"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
