import ProfileMobile from "./profileMobile";
import SidebarMobile from "./sidebarMobile";

export default function NavbarMobile() {
  return (
    <div className="md:hidden sticky top-0 z-[70] bg-white">
      <div className="py-2 px-4 flex items-center justify-between">
        <ProfileMobile />
        <SidebarMobile />
      </div>
    </div>
  );
}
