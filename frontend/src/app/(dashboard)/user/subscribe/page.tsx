import Hero from "../../_components/hero";
import Subscribe from "./_components/subscribe";

export default function SubscribePage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Subscribe" />
        <Subscribe />
      </div>
    </div>
  );
}
