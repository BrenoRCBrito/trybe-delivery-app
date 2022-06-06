import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getOrders } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import Orders from '../../components/CustomerOrdersList';

function CustomerOrders() {
  const { userData, setOrders } = useContext(Context);

  useEffect(() => {
    getOrders(userData.token)
      .then(({ sale }) => sale && setOrders(sale))
      .catch((e) => console.log(e));
  }, [setOrders, userData.token]);

  return (
    <div>
      <Navbar />
      <Orders />
    </div>
  );
}

export default CustomerOrders;
