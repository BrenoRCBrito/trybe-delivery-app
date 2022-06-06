import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function OrderCard(props) {
  const { sale, data } = props;

  return (
    <Link to={ `/${data.role}/${sale.id}` }>
      <label htmlFor={ `${data.html}${sale.id}` }>
        Pedido
        <p
          id={ `${data.html}${sale.id}` }
          data-testid={ `${data.id}${sale.id}` }
        >
          {sale.id}
        </p>
      </label>

      <p
        data-testid={ `${data.status}${sale.id}` }
      >
        {sale.status}
      </p>

      <p
        data-testid={ `${data.date}${sale.id}` }
      >
        {moment(sale.sale_date).format('L')}
      </p>

      <p
        data-testid={ `${data.price}${sale.id}` }
      >
        {sale.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>

      { data.address && (
        <p
          data-testid={ `${data.address}${sale.id}` }
        >
          { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
        </p>
      ) }
    </Link>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
};

export default OrderCard;
