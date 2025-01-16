import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import { Outlet } from "react-router-dom";

//import Topbar from "@/components/shared/Topbar";
//import Bottombar from "@/components/shared/Bottombar";
//import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="flex-col w-full h-full">

      <Topbar />

      <section className="flex overflow-auto">
        <Outlet />
      </section>

      <Bottombar />


    </div>
  );
};

export default RootLayout;
