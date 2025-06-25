import Hero from "../../_components/hero";
import { ChangePassword } from "./_components/changePassword";

export default function SubscribePage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Password Change" />
        <ChangePassword />
      </div>
    </div>
  );
}
