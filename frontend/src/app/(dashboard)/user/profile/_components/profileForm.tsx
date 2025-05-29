"use client";

import { normalizeProfile } from "@/helper/normalizerUserProfile";
import axios from "@/lib/axios";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { IUserProfile } from "@/types/userProfile";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const fetchCities = async (provinceId: string) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      fetchCities(selectedProvinceId);
    } else {
      setCities([]);
    }
  }, [selectedProvinceId]);

  const handleSubmit = async (values: IUserProfile) => {
    try {
      const selectedProvince = provinces.find((p) => p.id === values.state);
      const updatedValues = {
        ...values,
        state: selectedProvince?.name || "",
      };

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
      toast.success("Update Success !");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Update Failed !");
      }
      console.error(err);
    }
  };

  return (
    <div>
      <Formik
        initialValues={normalizeProfile(profile)}
        validationSchema={userProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4 text-sm text-gray-800">
            <div>
              <label className="text-xs font-medium capitalize">
                First Name:
              </label>
              <Field name="firstName" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Last Name:
              </label>
              <Field name="lastName" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Username:
              </label>
              <Field
                name="username"
                className="border p-2 rounded w-full bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">Email:</label>
              <Field
                name="email"
                className="border p-2 rounded w-full bg-gray-100"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">Gender:</label>
              <Field
                as="select"
                name="gender"
                className="border p-2 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="PreferNotToSay">PreferNotToSay</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Date of Birth:
              </label>
              <Field
                type="date"
                name="dob"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Education:
              </label>
              <Field
                as="select"
                name="education"
                className="border p-2 rounded w-full"
              >
                <option value="">Select Education</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="education"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">Country:</label>
              <Field name="country" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Province:
              </label>
              <Field
                as="select"
                name="state"
                className="w-full border px-3 py-2 rounded"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedId = e.target.value;
                  setFieldValue("state", selectedId);
                  setFieldValue("city", "");
                  setSelectedProvinceId(selectedId);
                }}
              >
                <option value="">Select Province</option>
                {provinces.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">City:</label>
              <Field
                as="select"
                name="city"
                className="w-full border px-3 py-2 rounded"
                disabled={!cities.length}
              >
                <option value="">Select City</option>
                {cities.map((city: any) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">
                Zip Code:
              </label>
              <Field name="zipCode" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="zipCode"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">
                Region Number:
              </label>
              <Field
                name="regionNumber"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="regionNumber"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">
                Phone Number:
              </label>
              <Field name="phoneNumber" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

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
