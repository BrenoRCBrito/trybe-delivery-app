import React, { useContext } from 'react';
import Context from '../../context/Context';
import OrderCard from '../CustomerOrderCard';

function Orders() {
  const { orders } = useContext(Context);

  return (
    <div>
      { orders
        && orders.map(
          (sale) => <OrderCard key={ sale.id } sale={ sale } />,
        )}
      { orders.length === 0 && <span>Nenhum pedido</span> }
    </div>
  );
}

export default Orders;
