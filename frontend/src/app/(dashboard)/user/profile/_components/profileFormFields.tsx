/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectInput from "@/components/atoms/SelectInput";
import ProvinceCitySelector from "../../../../../components/atoms/provinceCitySelector";
import TextInput from "@/components/atoms/textInput";


interface ProfileFormFieldsProps {
  setFieldValue: (field: string, value: any) => void;
  provinceValue: string;
}

export default function ProfileFormFields({
  setFieldValue,
  provinceValue,
}: ProfileFormFieldsProps) {
  return (
    <>
      <TextInput label="First Name" name="firstName" />
      <TextInput label="Last Name" name="lastName" />
      <TextInput label="Username" name="username" readOnly />
      <TextInput label="Email" name="email" readOnly />
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
      <TextInput label="Country" name="country" />
      <ProvinceCitySelector
        setFieldValue={setFieldValue}
        provinceValue={provinceValue}
      />
      <TextInput label="Zip Code" name="zipCode" />
      <TextInput label="Region Number" name="regionNumber" />
      <TextInput label="Phone Number" name="phoneNumber" />
    </>
  );
}
