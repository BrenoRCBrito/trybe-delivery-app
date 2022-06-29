import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

function Navbar() {
  const { user, makeLogout } = useContext(Context);
  const goTo = useHistory();
  const isCustomerPage = window.location.href.includes('customer');
  const isSellerPage = window.location.href.includes('seller');
  const dynamicLink = (
    <button
      data-testid={
        isCustomerPage
          ? 'customer_products__element-navbar-link-products'
          : 'customer_products__element-navbar-link-orders'
      }
      type="button"
      className="h-full w-full"
      onClick={ () => {
        if (isCustomerPage) goTo.push('/customer/products');
        if (isSellerPage) goTo.push('/seller/orders');
        goTo.push('admin/manage');
      } }
    >
      {isCustomerPage && 'Produtos'}
      {isSellerPage && 'Pedidos'}
      {window.location.href.includes('admin') && 'Gerenciar Usuários'}
    </button>
  );
  const ordersLink = isCustomerPage && (
    <button
      type="button"
      data-testid="customer_products__element-navbar-link-orders"
      className="h-full w-full brightness bg-trybeDarkGreen"
      onClick={ () => {
        goTo.push('/customer/orders');
      } }
    >
      Meus Pedidos
    </button>
  );
  const userName = (
    <div data-testid="customer_products__element-navbar-user-full-name">
      {user.name}
    </div>
  );
  const logoutBtn = (
    <button
      type="button"
      data-testid="customer_products__element-navbar-link-logout"
      className="h-full w-full"
      onClick={ () => {
        makeLogout();
        goTo.push('/login');
      } }
    >
      Sair
    </button>
  );
  return (
    <>
      <nav className="h-12 mx-auto sm:bg-trybeDarkGreen font-bold absolute w-full">
        <div className="hidden md:flex w-full h-12 bg-trybeDarkGreen">
          <div
            className={ `bg-trybeLightGreen grow-[2] 
          text-center h-full text-white brightness ` }
          >
            {dynamicLink}
          </div>
          <div
            className={ `md:bg-trybeDarkGreen md:grow-[4] 
          text-center text-white font-bold h-full` }
          >
            {ordersLink}
          </div>
          <div
            className={ `bg-trybePurple grow-[3] text-center text-white 
          font-bold h-full flex flex-col justify-center align-middle` }
          >
            {userName}
          </div>
          <div
            className={ `bg-trybeBlue grow-[1] text-center
           text-white font-bold h-full brightness` }
          >
            {logoutBtn}
          </div>
        </div>
        <div className="md:hidden pt-4 pl-3.5 h-full bg-trybeDarkGreen">
          <button
            id="menu-btn"
            type="button"
            className="block hamburger md:hidden focus:outline-none "
            onClick={ () => {
              const btn = document.getElementById('menu-btn');
              const menu = document.getElementById('menu');
              btn.classList.toggle('hamburger-open');
              menu.classList.toggle('flex');
              menu.classList.toggle('menu-open');
            } }
          >
            <span className="hamburger-top" />
            <span className="hamburger-middle" />
            <span className="hamburger-bottom" />
          </button>
        </div>
        <div className=" md:hidden">
          <div
            id="menu"
            className="flex-col items-center self-end
           font-bold bg-white sm:w-auto sm:self-center
          left-6 right-6 drop-shadow-md menu-closed h-12"
          >
            <div
              className="m-0 bg-trybePurple
           text-center py-3  text-white w-full"
            >
              {userName}
            </div>
            <div
              className="bg-trybeDarkGreen
           text-center py-3 text-white w-full m-0"
            >
              {ordersLink}
            </div>
            <div
              className="bg-trybeLightGreen
           text-center py-3 text-white w-full m-0 "
            >
              {dynamicLink}
            </div>
            <div
              className="bg-trybeBlue
           text-center py-3 text-white w-full m-0 "
            >
              {logoutBtn}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  );
}

export default Navbar;
