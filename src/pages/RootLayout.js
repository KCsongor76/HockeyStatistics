import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation /> {/* Menu points */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
