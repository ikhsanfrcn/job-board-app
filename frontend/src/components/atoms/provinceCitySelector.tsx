/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import SelectInput from "@/components/atoms/SelectInput";

interface ProvinceCitySelectorProps {
  setFieldValue: (field: string, value: any) => void;
  provinceValue: string;
}

export default function ProvinceCitySelector({
  setFieldValue,
  provinceValue,
}: ProvinceCitySelectorProps) {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    provinceValue || ""
  );

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinces(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
        )
        .then((res) => setCities(res.data))
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  return (
    <>
      <SelectInput
        label="Province"
        name="state"
        options={provinces.map((p) => ({ label: p.name, value: p.id }))}
        value={selectedProvince}
        onChange={(option) => {
          setSelectedProvince(option.value);
          setFieldValue("state", option.value);
          setFieldValue("city", "");
        }}
      />
      <SelectInput
        label="City"
        name="city"
        options={cities.map((c) => ({ label: c.name, value: c.name }))}
        disabled={!cities.length}
        onChange={(option) => {
          setFieldValue("city", option.value);
        }}
      />
    </>
  );
}
