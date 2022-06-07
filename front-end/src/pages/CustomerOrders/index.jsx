import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getSales } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import Orders from '../../components/OrdersList';
import data from '../../components/utils/orderData';

function CustomerOrders() {
  const { userData, setOrders } = useContext(Context);

  useEffect(() => {
    getSales(userData.token)
      .then(({ sales }) => setOrders(sales))
      .catch((e) => console.log(e));
  }, [setOrders, userData.token]);

  return (
    <div>
      <Navbar />
      <Orders data={ data.Customer } />
    </div>
  );
}

export default CustomerOrders;
