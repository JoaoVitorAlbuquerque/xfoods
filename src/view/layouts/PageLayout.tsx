import { Outlet } from "react-router-dom";
import { Aside } from "../components/Aside";

export function PageLayout() {
  return (
    <div className="flex w-full h-full">
      <Aside />

      <div className="flex flex-col w-11/12 ml-9 mr-20">
        <Outlet />

        <footer className="border bg-white">
          <div className="font-semibold px-2 text-[17px]">
            Developed by <span className="font-bold">ViaTech®</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
