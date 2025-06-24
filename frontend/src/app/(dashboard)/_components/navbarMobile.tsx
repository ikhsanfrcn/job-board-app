import ProfileMobile from "./profileMobile";
import SidebarMobile from "./sidebarMobile";


export default function NavbarMobile() {
  return (
    <div className="sticky top-0 bg-white">
      <div className="py-2 md:py-2 px-4 md:px-12 flex items-center justify-between">
        <div className="lg:hidden">
          <ProfileMobile />
        </div>
        <div className="lg:hidden">
          <SidebarMobile />
        </div>
      </div>
    </div>
  );
}
