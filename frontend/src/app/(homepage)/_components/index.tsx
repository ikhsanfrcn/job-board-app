import Discovery from "./discovery";
import Hero from "./hero";
import JobFilter from "./jobfilter";

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen">
      <Hero />
      <JobFilter />
      <Discovery />
    </div>
  );
}
