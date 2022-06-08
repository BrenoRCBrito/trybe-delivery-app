import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import { getSellers, postOrder } from '../../services';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { setCartLS, clearCartLS } from '../../services/localstorage';

import Navbar from '../../components/Navbar/Navbar';

function CustomerCheckout() {
  const {
    userData,
    checkout,
    setCheckout,
    initializeUser,
    calculateTotalPrice,
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
    if (userData.token) {
      getSellers(userData.token)
        .then((response) => {
          setSellers(response.users);
        })
        .catch((e) => console.log(e));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleChange = ({ target: { name, value } }) => {
    setCheckout({ ...checkout, cart: { ...checkout.cart, [name]: value } });
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    const total = calculateTotalPrice(updatedProducts);
    setCheckout({
      cart: { ...checkout.cart, totalPrice: total },
      products: updatedProducts });
    setCartLS({
      cart: { ...checkout.cart, totalPrice: total },
      products: updatedProducts });
  };

  const handleSubmit = () => {
    postOrder(userData.token, checkout)
      .then((response) => {
        if (response.sale.id) {
          setCheckout({
            cart: {
              totalPrice: 0,
              sellerId: '',
              deliveryAddress: '',
              deliveryNumber: '',
            },
            products: [],
          });
          clearCartLS();
          goTo.push(`/customer/orders/${response.sale.id}`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Navbar />
      <h2>Finalizar Pedido</h2>
      <div>
        <CheckoutTable
          products={ products }
          handleRemoveItem={ handleRemoveItem }
        />
        <h3>
          Total: R$
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {totalPriceBR}
          </span>
        </h3>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <CheckoutForm
          sellers={ sellers }
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
        />
      </div>
    </div>
  );
}

export default CustomerCheckout;
