import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { clearLocalStorage } from '../../services/localstorage';

function Navbar() {
  const { userData, setUserData } = useContext(Context);
  const goTo = useHistory();
  const isCustomerPage = window.location.href.includes('customer');
  const isSellerPage = window.location.href.includes('seller');
  return (
    <nav>
      <div>
        <Link
          data-testid={
            isCustomerPage
              ? 'customer_products__element-navbar-link-products'
              : 'customer_products__element-navbar-link-orders'
          }
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
            Meus Pedidos
          </Link>
        )}
        <h3 data-testid="customer_products__element-navbar-user-full-name">
          {userData.name}
        </h3>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            clearLocalStorage();
            setUserData({});
            goTo.push('/login');
          } }
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
