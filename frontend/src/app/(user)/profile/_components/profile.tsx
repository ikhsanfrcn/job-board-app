import Bowls from "./bowls";
import ProfileForm from "./profileForm";
import SideBar from "./sidebar";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap">
        <div className="w-2/12">
          <SideBar />
        </div>
        <div className="w-7/12">
          <ProfileForm />
        </div>
        <div className="w-3/12">
          <Bowls />
        </div>
      </div>
    </div>
  );
}
