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

  const [selectedProvinceName, setSelectedProvinceName] = useState<string>(provinceValue || "");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => {
        setProvinces(res.data);

        if (provinceValue) {
          const selected = res.data.find((p: any) => p.name === provinceValue);
          if (selected) {
            setSelectedProvinceId(selected.id);
          }
        }
      })
      .catch(console.error);
  }, [provinceValue]);

  useEffect(() => {
    if (selectedProvinceId) {
      axios
        .get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`)
        .then((res) => setCities(res.data))
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [selectedProvinceId]);

  return (
    <>
      <SelectInput
        label="Province"
        name="state"
        options={provinces.map((p) => ({
          label: p.name,
          value: p.name,
          id: p.id,
        }))}
        value={selectedProvinceName}
        onChange={(option: any) => {
          setSelectedProvinceName(option.value);
          setSelectedProvinceId(option.id);
          setFieldValue("state", option.value);
          setFieldValue("city", "");
        }}
      />

      <SelectInput
        label="City"
        name="city"
        options={cities.map((c) => ({
          label: c.name,
          value: c.name,
        }))}
        disabled={!cities.length}
        onChange={(option: any) => {
          setFieldValue("city", option.value);
        }}
      />
    </>
  );
}
