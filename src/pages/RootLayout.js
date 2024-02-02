import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

/**
 * This component is responsible for rendering the menu 
 * above all pages and the given outlet - page details
 * @returns 
 */
const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
