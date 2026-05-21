export default function SideBar() {
  return (
    <div className="w-full p-4">
      <h4 className="text-lg font-semibold">Keep it Real</h4>
      <p className="text-sm">
        Thank you for contributing to the community. Your opinion will help
        others make decisions about jobs and companies.
      </p>
      <p className="text-sm font-semibold mb-3">
        Please stick to the{" "}
        <span className="text-green-700">Community Guidelines </span>and do not
        post:
      </p>
      <ul className="text-sm list-disc list-inside">
        <li>Aggressive or discriminatory language</li>
        <li>Profanities</li>
        <li>Trade secrets/confidential information</li>
      </ul>
    </div>
  );
}
