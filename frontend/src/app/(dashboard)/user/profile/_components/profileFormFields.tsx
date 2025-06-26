import { useState } from "react";
import SelectInput from "@/components/atoms/SelectInput";
import ProvinceCitySelector from "../../../../../components/atoms/provinceCitySelector";
import TextInput from "@/components/atoms/textInput";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface ProfileFormFieldsProps {
  setFieldValue: (field: string, value: any) => void;
  provinceValue: string;
}

export default function ProfileFormFields({
  setFieldValue,
  provinceValue,
}: ProfileFormFieldsProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const token = session?.accessToken;
  
  const handleRequestEmailChange = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/users/request-email-change", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.info("Request email change sent successfully!");
      console.log(response);
    } catch (error) {
      console.log("Failed to request email change", error);
      toast.error("Failed to request email change");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextInput label="First Name" name="firstName" />
      <TextInput label="Last Name" name="lastName" />
      <TextInput label="Username" name="username" readOnly />
      <div className="flex items-center gap-2">
        <TextInput label="Email" name="email" readOnly />
        <button
          type="button"
          onClick={handleRequestEmailChange}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Requesting..." : "Request Change"}
        </button>
      </div>
      <SelectInput
        label="Gender"
        name="gender"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Prefer Not To Say", value: "PreferNotToSay" },
        ]}
      />
      <TextInput label="Date of Birth" name="dob" type="date" />
      <SelectInput
        label="Education"
        name="education"
        options={[
          { label: "High School", value: "High School" },
          { label: "Diploma", value: "Diploma" },
          { label: "Bachelor", value: "Bachelor" },
          { label: "Master", value: "Master" },
          { label: "Doctorate", value: "Doctorate" },
          { label: "Other", value: "Other" },
        ]}
      />
      <TextInput label="Country" name="country" readOnly />
      <ProvinceCitySelector
        setFieldValue={setFieldValue}
        provinceValue={provinceValue}
      />
      <TextInput label="Zip Code" name="zipCode" />
      <TextInput type="number" label="Region Number" name="regionNumber" />
      <TextInput type="number" label="Phone Number" name="phoneNumber" />
    </>
  );
}
