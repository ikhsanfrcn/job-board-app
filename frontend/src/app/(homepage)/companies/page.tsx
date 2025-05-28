import Companies from "./_components/companies";
import Hero from "./_components/hero";

export default function CompaniesPage() {
  return (
    <div className="w-full">
      <Hero />
      <div className="w-full lg:px-32">
        <Companies />
      </div>
    </div>
  );
}
