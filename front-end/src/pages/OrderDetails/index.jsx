import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetail from '../../components/OrderDetail';
import Context from '../../context/Context';
import { getSale } from '../../services';

function OrderDetails() {
  const { setSale, userData } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    getSale(userData.token, id)
      .then(({ sale }) => sale && setSale(sale))
      .catch((e) => console.log(e));
  }, [id, setSale, userData.token]);

  return (
    <div>
      <h1>Detalhes do Pedido</h1>
      <OrderDetail />
    </div>
  );
}

export default OrderDetails;
