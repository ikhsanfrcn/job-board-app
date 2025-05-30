import Hero from "./_components/hero";
import Profile from "./_components/profile";
import Resume from "./_components/resume";

export default function ProfilePage() {
  return (
    <div className="w-full md:px-14">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero />
        <Profile />
        <Resume />
      </div>
    </div>
  );
}
