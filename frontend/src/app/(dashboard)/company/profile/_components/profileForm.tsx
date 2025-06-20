"use client";

import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AxiosError } from "axios";

import { ICompanyProfile } from "@/types/companyType";
import axios from "@/lib/axios";
import { normalizeCompanyProfile } from "@/helper/normalizerCompanyProfile";
import { companyProfileSchema } from "@/schema/companySchema";
import TextInput from "@/components/atoms/textInput";
import ProvinceCitySelector from "@/components/atoms/provinceCitySelector";
import { RichTextInput } from "@/components/atoms/richTextInput";

const MapWithNoSSR = dynamic(() => import("./profileMap"), { ssr: false });

interface IProps {
  profile: ICompanyProfile;
  token?: string;
  setProfile: (profile: ICompanyProfile) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export default function ProfileForm({
  profile,
  token,
  setProfile,
  setIsEditing,
}: IProps) {
  const [provinceValue, setProvinceValue] = useState(profile.state || "");

  const handleSubmit = async (values: ICompanyProfile) => {
    try {
      const updatedValues = {
        ...values,
        state: values.state || "",
        latitude: values.latitude?.toString?.() || "",
        longitude: values.longitude?.toString?.() || "",
      };

      const { data } = await axios.patch(
        "/company/profile",
        normalizeCompanyProfile(updatedValues),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(data.data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Update Failed!");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={normalizeCompanyProfile(profile)}
        validationSchema={companyProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4 text-sm text-gray-800">
            <TextInput label="Name" name="name" />
            <TextInput label="Email" name="email" readOnly />
            <TextInput label="Phone Number" name="phoneNumber" />

            <ProvinceCitySelector
              setFieldValue={(field, value) => {
                if (field === "state") setProvinceValue(value);
                setFieldValue(field, value);
              }}
              provinceValue={provinceValue}
            />

            <TextInput label="Zip Code" name="zipCode" />
            <TextInput label="Region Number" name="regionNumber" />
            <TextInput label="Address" name="address" />

            <TextInput label="Latitude" name="latitude" readOnly />
            <TextInput label="Longitude" name="longitude" readOnly />

            <div>
              <label className="text-xs font-medium capitalize">
                Select Location on Map:
              </label>
              <div className="h-64">
                <MapWithNoSSR
                  lat={values.latitude}
                  lng={values.longitude}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>

            <TextInput label="Website" name="website" />
            <RichTextInput
              value={values.about}
              onChange={(content) => setFieldValue("about", content)}
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
    </div>
  );
}
