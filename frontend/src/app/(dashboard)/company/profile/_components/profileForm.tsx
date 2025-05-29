import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { ICompanyProfile } from "@/types/companyType";
import axios from "@/lib/axios";
import { normalizeCompanyProfile } from "@/helper/normalizerCompanyProfile";
import { useEffect, useState } from "react";
import { companyProfileSchema } from "@/schema/companySchema";

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
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
      console.log(response.data);
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

  const handleSubmit = async (values: ICompanyProfile) => {
    try {
      const selectedProvince = provinces.find((p) => p.id === values.state);
      const updatedValues = {
        ...values,
        state: selectedProvince?.name || "",
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
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div>
      <Formik
        initialValues={normalizeCompanyProfile(profile)}
        validationSchema={companyProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4 text-sm text-gray-800">
            <div>
              <label className="text-xs font-medium capitalize">Name:</label>
              <Field name="name" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs"
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
              <label className="text-xs font-medium capitalize">
                Phone Number:
              </label>
              <Field name="phoneNumber" className="border p-2 rounded w-full" />
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
                  const selectedName =
                    provinces.find((p) => p.id === selectedId)?.name || "";
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
              <Field
                as="select"
                name="city"
                className="w-full border px-3 py-2 rounded"
                disabled={!cities.length}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue("city", e.target.value)
                }
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
            </div>
            <div>
              <label className="text-xs font-medium capitalize">
                Region Number:
              </label>
              <Field
                name="regionNumber"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">Address:</label>
              <Field name="address" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">
                Latitude:
              </label>
              <Field name="latitude" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">
                Longitude:
              </label>
              <Field name="longitude" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="text-xs font-medium capitalize">Website:</label>
              <Field name="website" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="website"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-medium capitalize">About:</label>
              <Field
                as="textarea"
                name="about"
                rows={3}
                className="border p-2 rounded w-full"
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
