import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function OrderCard(props) {
  const { sale, data } = props;
  const date = moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY');
  const totalPrice = Number(sale.totalPrice)
    .toLocaleString('pt-br', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Link to={ `/${data.role}/orders/${sale.id}` }>
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
            { date }
          </div>

          <div>
            <span>R$ </span>
            <span data-testid={ `${data.price}${sale.id}` }>{ totalPrice }</span>
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
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  sale: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
