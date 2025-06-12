import Hero from "../../_components/hero";
import Profile from "./_components/profile";
import Resume from "./_components/resume";

export default function ProfilePage() {
  return (
    <div className="w-full md:px-14 h-screen overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <Hero title="Profile" />
        <Profile />
        <div className="border-t border-gray-200">
          <Resume />
        </div>
      </div>
    </div>
  );
}
