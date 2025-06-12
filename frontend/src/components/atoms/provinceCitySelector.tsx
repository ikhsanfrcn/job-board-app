/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinces(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (provinceValue) {
      axios
        .get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceValue}.json`)
        .then((res) => setCities(res.data))
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [provinceValue]);

  return (
    <>
      <SelectInput
        label="Province"
        name="state"
        options={provinces.map((p) => ({ label: p.name, value: p.id }))}
      />
      <SelectInput
        label="City"
        name="city"
        options={cities.map((c) => ({ label: c.name, value: c.name }))}
        disabled={!cities.length}
      />
    </>
  );
}
