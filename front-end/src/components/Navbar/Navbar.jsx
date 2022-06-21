import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

function Navbar() {
  const { user, makeLogout } = useContext(Context);
  const isCustomerPage = window.location.href.includes('customer');
  const isSellerPage = window.location.href.includes('seller');
  return (
    <nav className="flex justify-between h-[8vh] items-center">
      <div className="flex">
        <Link
          data-testid={
            isCustomerPage
              ? 'customer_products__element-navbar-link-products'
              : 'customer_products__element-navbar-link-orders'
          }
          className="m-auto"
          to={ () => {
            if (isCustomerPage) return '/customer/products';
            if (isSellerPage) return '/seller/orders';
            return 'admin/manage';
          } }
        >
          {isCustomerPage && 'PRODUTOS'}
          {isSellerPage && 'PEDIDOS'}
          {window.location.href.includes('admin') && 'GERENCIAR USUÁRIOS'}
        </Link>
        {isCustomerPage && (
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            MEUS PEDIDOS
          </Link>
        )}
      </div>
      <div className="flex">
        <h3 data-testid="customer_products__element-navbar-user-full-name">
          {user.name}
        </h3>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            makeLogout();
          } }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
