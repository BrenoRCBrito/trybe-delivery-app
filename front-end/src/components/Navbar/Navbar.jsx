import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { clearLocalStorage } from '../../services/localstorage';

function Navbar() {
  const { userData } = useContext(Context);
  const goTo = useHistory();

  return (
    <nav>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          Produtos
        </Link>
        {window.location.href.includes('customer') && (
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
