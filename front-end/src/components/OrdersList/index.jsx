import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../../context/Context';
import OrderCard from '../OrderCard';

function Orders(props) {
  const { data } = props;
  const { orders } = useContext(Context);

  return (
    <div>
      { orders.length > 0
        && orders.map(
          (sale) => <OrderCard key={ sale.id } sale={ sale } data={ data } />,
        )}
      { orders.length === 0 && <span>Nenhum pedido</span> }
    </div>
  );
}

Orders.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Orders;
