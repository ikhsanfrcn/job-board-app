"use client";

interface SubscriptionCardProps {
  name: string;
  price: number;
  features: string[];
  onSubscribe: () => void;
  loading: boolean;
}

export default function SubscriptionCard({
  name,
  price,
  features,
  onSubscribe,
  loading,
}: SubscriptionCardProps) {
  return (
    <div className="border rounded-xl shadow-md p-6 w-full md:w-80">
      <h2 className="text-xl font-bold text-pink-600 mb-2">{name}</h2>
      <p className="text-2xl font-semibold text-blue-900 mb-2">
        IDR {`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </p>
      <p className="text-gray-600 mb-4">for 30 days</p>
      <ul className="list-disc list-inside mb-6 text-sm text-gray-700">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        onClick={onSubscribe}
        disabled={loading}
        className="bg-pink-600 text-white w-full py-2 rounded-md hover:bg-pink-700 transition"
      >
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
}
