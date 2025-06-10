import { SubscriptionPlan } from "@/types/subscriptionType";

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (id: string) => void;
}

export const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => (
  <div className="bg-white border p-4 rounded shadow">
    <h3 className="text-xl font-bold">{plan.name}</h3>
    <p className="text-gray-600 text-sm">Type: {plan.type}</p>
    <p className="text-gray-600 text-sm">Price: Rp {plan.price.toLocaleString()}</p>
    <div className="text-gray-600 text-sm">
      <p>Features:</p>
      <ul className="list-disc list-inside">
        {plan.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
    <div className="mt-4 flex gap-2">
      <button
        onClick={() => onEdit(plan)}
        className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(plan.id)}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);
