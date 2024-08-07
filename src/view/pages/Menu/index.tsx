import { Link, Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { MenuIcon } from "../../components/icons/MenuIcon";
import { useState } from "react";

export function Menu() {
  const [activeButtonId, setActiveButtonId] = useState<string | null>('1');
  const [activeCategoriesButtonId, setActiveCategoriesButtonId] = useState<string | null>(null);

  function handleButtonClick(id: string | null) {
    setActiveButtonId(id);
    setActiveCategoriesButtonId(null);
  }

  function handleCategoriesButtonClick(id: string | null) {
    setActiveCategoriesButtonId(id);
    setActiveButtonId(null);
  }

  return (
    <>
      <Header
        icon={<MenuIcon className="w-8 h-8" />}
        description="Gerencie os produtos do seu estabelecimento"
      >
        Cardápio
      </Header>

      <div className="flex-1">
        <div className="py-4 border-b border-b-gray-600/40 mb-8">
          <Link
            to="/menu/products"
            key="1"
            id="1"
            onClick={() => handleButtonClick('1')}
            className={`${activeButtonId === '1' ? 'px-16' : 'px-10'} py-4 ${activeButtonId === '1' ? 'bg-white' : 'bg-transparent'} ${activeButtonId === '1' ? 'text-red-600' : 'text-gray-400'} ${activeButtonId === '1' ? 'font-bold' : 'font-normal'} ${activeButtonId && 'pointer-events-none'} text-sm rounded-t-lg`}
          >
            Produtos
          </Link>

          <Link
            to="/menu/categories"
            key="2"
            id="2"
            onClick={() => handleCategoriesButtonClick('2')}
            className={`${activeCategoriesButtonId === '2' ? 'px-16' : 'px-10'} py-4 ${activeCategoriesButtonId === '2' ? 'bg-white' : 'bg-transparent'} ${activeCategoriesButtonId === '2' ? 'text-red-600' : 'text-gray-400'} ${activeCategoriesButtonId === '2' ? 'font-bold' : 'font-normal'} text-sm rounded-t-lg ${activeCategoriesButtonId && 'pointer-events-none'}`}
          >
            Categorias
          </Link>
        </div>

        <Outlet />
      </div>
    </>
  );
}
