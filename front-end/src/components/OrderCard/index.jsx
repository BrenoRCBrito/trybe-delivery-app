import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function OrderCard(props) {
  const { sale, data } = props;

  return (
    <Link to={ `/${data.role}/${sale.id}` }>
      <div>
        <div>
          <label htmlFor={ `${data.html}${sale.id}` }>
            Pedido
            <p
              id={ `${data.html}${sale.id}` }
              data-testid={ `${data.id}${sale.id}` }
            >
              {sale.id}
            </p>
          </label>
        </div>
        <div>
          <div
            data-testid={ `${data.status}${sale.id}` }
          >
            {sale.status}
          </div>

          <div
            data-testid={ `${data.date}${sale.id}` }
          >
            {moment(sale.sale_date).format('L')}
          </div>

          <div
            data-testid={ `${data.price}${sale.id}` }
          >
            {sale.totalPrice
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>

          { data.address && (
            <div
              data-testid={ `${data.address}${sale.id}` }
            >
              { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
            </div>
          ) }
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
};

export default OrderCard;
