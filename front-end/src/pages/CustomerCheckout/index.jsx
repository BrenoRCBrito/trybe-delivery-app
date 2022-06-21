import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getUsers, postSale } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import {
  setCheckoutLS,
  clearCheckoutLS,
  INITIAL_CHECKOUT,
} from '../../services/localStorage';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const {
    token,
    checkout,
    setCheckout,
    initializeUser,
    synchronizeProducts,
  } = useContext(Context);

  const { products, cart: { totalPrice } } = checkout;

  const totalPriceBR = totalPrice
    .toLocaleString('pt-br', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const [sellers, setSellers] = useState([]);

  const goTo = useHistory();

  useEffect(() => {
    initializeUser();
    if (token) {
      getUsers(token)
        .then((response) => {
          setSellers(response.users);
        })
        .catch((e) => console.log(e));
    }
  }, [initializeUser, token]);

  const handleChange = ({ target: { name, value } }) => {
    const updatedCheckout = { ...checkout, cart: { ...checkout.cart, [name]: value } };
    setCheckout(updatedCheckout);
    setCheckoutLS(updatedCheckout);
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    synchronizeProducts(updatedProducts);
  };

  const handleSubmit = () => {
    postSale(token, checkout)
      .then((response) => {
        if (response.sale.id) {
          setCheckout(INITIAL_CHECKOUT);
          clearCheckoutLS();
          goTo.push(`/customer/orders/${response.sale.id}`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="mb-12">
      <Navbar />
      <div className="flex flex-col w-[85%] h-[80%] m-auto">
        <h2 className="text-3xl">Finalizar Pedido</h2>
        <div className="flex flex-col border border-[#B1C2BE] shadow-login mb-7">
          { products.length
          && <CheckoutTable
            products={ products }
            handleRemoveItem={ handleRemoveItem }
          />}
          <div
            className={ `flex self-end w-[20%] h-[8vh] justify-center
          items-center bg-[#036B52] m-3 rounded-[10px] text-white text-4xl` }
          >
            Total: R$
            <span data-testid="customer_checkout__element-order-total-price">
              {totalPriceBR}
            </span>
          </div>
        </div>
        <h2 className="text-3xl">Detalhes e Endereço para Entrega</h2>
        <div className="flex flex-col border border-[#B1C2BE] shadow-login">
          <CheckoutForm
            sellers={ sellers }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerCheckout;
