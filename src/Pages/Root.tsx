import { Outlet } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";

import Header from "../Components/Header";

const RootLayout: React.FC = () => {
  return (
    <div className="bg-bgColor min-h-screen py-7">
      <Header />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
