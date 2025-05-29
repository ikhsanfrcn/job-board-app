"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function LocationPicker({ setFieldValue }: { setFieldValue: any }) {
  useMapEvents({
    click(e) {
      setFieldValue("latitude", e.latlng.lat.toString());
      setFieldValue("longitude", e.latlng.lng.toString());
    },
  });
  return null;
}

export default function ProfileMap({
  lat,
  lng,
  setFieldValue,
}: {
  lat: string;
  lng: string;
  setFieldValue: any;
}) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const hasCoords = !isNaN(latitude) && !isNaN(longitude);

  return (
    <MapContainer
      center={hasCoords ? [latitude, longitude] : [-6.2, 106.8]}
      zoom={5}
      className="h-full w-full rounded border"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationPicker setFieldValue={setFieldValue} />
      {hasCoords && <Marker position={[latitude, longitude]} />}
    </MapContainer>
  );
}
