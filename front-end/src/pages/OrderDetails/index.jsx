import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import OrderDetail from '../../components/OrderDetail';

function OrderDetails(props) {
  const { data } = props;

  return (
    <div>
      <Navbar />
      <h1>Detalhes do Pedido</h1>
      <OrderDetail data={ data } />
    </div>
  );
}

OrderDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default OrderDetails;
