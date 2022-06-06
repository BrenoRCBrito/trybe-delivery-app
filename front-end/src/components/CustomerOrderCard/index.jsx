import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

function OrderCard(props) {
  const { sale } = props;

  return (
    <div>
      <label htmlFor={ `order-${sale.id}` }>
        Pedido
        <p
          id={ `order-${sale.id}` }
          data-testid={ `customer_orders__element-order-id-${sale.id}` }
        >
          {sale.id}
        </p>
      </label>

      <p
        data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
      >
        {sale.status}
      </p>

      <p
        data-testid={ `customer_orders__element-order-date-${sale.id}` }
      >
        {moment(sale.sale_date).format('L')}
      </p>

      <p
        data-testid={ `customer_orders__element-card-price-${sale.id}` }
      >
        {sale.total_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.objectOf.isRequired,
};

export default OrderCard;
