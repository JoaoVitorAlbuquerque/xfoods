import { Link } from "react-router-dom";
import { HomeIcon } from "./icons/HomeIcon";
import { HistoryIcon } from "./icons/HistoryIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { UserIcon } from "./icons/UserIcon";
import { ExitIcon } from "./icons/ExitIcon";
import { useAuth } from "../../app/hooks/useAuth";

export function Aside() {
  const { signout } = useAuth();

  return (
    <aside className="flex flex-col items-center justify-between w-1/12 bg-white h-full pt-10">
      <div className="flex justify-center text-2xl font-bold w-full text-gray-400">
        X<span className="font-light">F</span>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        <Link
          className="flex flex-col items-center w-full gap-2 p-6 text-sm font-medium text-gray-400"
          to="/"
        >
          <HomeIcon className="w-6 h-6" />

          Home
        </Link>

        <Link
          className="flex flex-col items-center w-full gap-2 p-6 text-sm font-medium text-gray-400"
          to="/history"
        >
          <HistoryIcon className="w-6 h-6" />

          Histórico
        </Link>

        <Link
          className="flex flex-col items-center w-full gap-2 p-6 text-sm font-medium text-gray-400"
          to="/menu/products"
        >
          <MenuIcon className="w-6 h-6" />

          Cardápio
        </Link>

        <Link
          className="flex flex-col items-center w-full gap-2 p-6 text-sm font-medium text-gray-400"
          to="/users"
        >
          <UserIcon className="w-6 h-6" />
          Usuários
        </Link>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        <Link
          className="p-6 text-sm font-medium text-gray-400 text-center"
          to="/finance"
        >
          <div className="flex justify-center text-2xl font-bold w-full text-gray-400">
            Pay<span className="font-light">X</span>
          </div>
          Financeiro
        </Link>


        <button
          className="p-6 flex flex-col items-center gap-2 w-full text-sm font-medium text-gray-400"
          onClick={signout}
        >
          <ExitIcon className="w-6 h-6" />

          Sair
        </button>
      </div>
    </aside>
  );
}
