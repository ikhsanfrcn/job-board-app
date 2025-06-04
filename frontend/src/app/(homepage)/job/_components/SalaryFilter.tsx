export const SalaryFilter = () => {
  return (
    <div className="border p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Desired minimum salary</h4>
      <input
        type="number"
        placeholder="$"
        className="border px-3 py-1 rounded w-full mb-2"
      />
      <select className="border px-3 py-1 rounded w-full">
        <option value="annually">Annually</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
}
