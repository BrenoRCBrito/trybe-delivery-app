import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getSales } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import Orders from '../../components/OrdersList';
import data from '../../components/utils/orderData';

function SellerOrders() {
  const { token, setOrders, initializeUser } = useContext(Context);

  useEffect(() => {
    initializeUser();
    if (token) {
      getSales(token)
        .then(({ sales }) => sales && setOrders(sales))
        .catch((e) => console.log(e));
    }
  }, [initializeUser, setOrders, token]);

  return (
    <div>
      <Navbar />
      <Orders data={ data.Seller } />
    </div>
  );
}

export default SellerOrders;
