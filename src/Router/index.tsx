import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';
import { Login } from '../view/pages/Login';
import { Dashboard } from '../view/pages/Dashboard';
import { History } from '../view/pages/History';
import { Menu } from '../view/pages/Menu';
import { Users } from '../view/pages/Users';
import { PageLayout } from '../view/layouts/PageLayout';
import { MenuProducts } from '../view/pages/Menu/components/MenuProducts';
import { MenuCategories } from '../view/pages/Menu/components/MenuCategories';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route element={<Menu />}>
              <Route path="/menu/products" element={<MenuProducts />} />
              <Route path="/menu/categories" element={<MenuCategories />} />
            </Route>
            <Route path="/users" element={<Users />} />
            <Route path="/finance" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
