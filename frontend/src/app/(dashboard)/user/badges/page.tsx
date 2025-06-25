import Hero from "../../_components/hero";
import Badges from "./_components/badges";

export default function BadgesPage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Badges" />
        <Badges />
      </div>
    </div>
  );
}
