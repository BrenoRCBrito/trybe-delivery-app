import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import OrderDetail from '../../components/OrderDetail';

function OrderDetails() {
  return (
    <div>
      <Navbar />
      <h1>Detalhes do Pedido</h1>
      <OrderDetail />
    </div>
  );
}

export default OrderDetails;
