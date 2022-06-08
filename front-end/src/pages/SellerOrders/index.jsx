import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getSales } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import Orders from '../../components/OrdersList';
import data from '../../components/utils/orderData';

function SellerOrders() {
  const { userData, setOrders, initializeUser } = useContext(Context);

  useEffect(() => {
    initializeUser();
    if (userData.token) {
      getSales(userData.token)
        .then(({ sales }) => sales && setOrders(sales))
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div>
      <Navbar />
      <Orders data={ data.Seller } />
    </div>
  );
}

export default SellerOrders;
