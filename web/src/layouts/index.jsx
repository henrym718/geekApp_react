import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer/index.";

export default function Layout() {
  return (
    <div className='flex flex-col h-screen mx-auto max-w-[738px]  md:max-w-[1024px] lg:max-w-[1366px]'>
      <div>
        <Header />
      </div>

      <div>
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
