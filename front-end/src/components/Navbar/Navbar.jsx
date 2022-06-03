import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

function Navbar() {
  const { userData } = useContext(Context);
  // const { item1, item2, item3, username } = props;
  // const { item1Label, item1Route } = item1;
  return (

    <nav>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          Produtos
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          Meus Pedidos
        </Link>

        <h3
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userData.name }
        </h3>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
        >
          Logout
        </Link>

      </div>
    </nav>

  );
}

export default Navbar;
