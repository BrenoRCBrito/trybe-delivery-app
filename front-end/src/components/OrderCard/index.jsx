import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function OrderCard(props) {
  const { sale, data } = props;
  const date = moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY');
  const totalPrice = Number(sale.totalPrice).toLocaleString('pt-br', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Link
      className="flex flex-row border shadow-login m-5 items-center max-h-fit max-w-fit"
      to={ `/${data.role}/orders/${sale.id}` }
    >
      <label className="text-sm px-6" htmlFor={ `${data.html}${sale.id}` }>
        Pedido
        <p
          className="text-xl text-center"
          id={ `${data.html}${sale.id}` }
          data-testid={ `${data.id}${sale.id}` }
        >
          {sale.id}
        </p>
      </label>
      <div className="bg-gray-200 h-28">
        <div className="flex flex-row items-center">
          <div
            className="bg-pending rounded m-1 px-8 py-6 uppercase font-bold"
            data-testid={ `${data.status}${sale.id}` }
          >
            {sale.status}
          </div>
          <div className="flex flex-col text-center">
            <div
              className="bg-white rounded py-1 px-2 m-1"
              data-testid={ `${data.date}${sale.id}` }
            >
              {date}
            </div>
            <div
              className="bg-white rounded py-1 px-2 m-1"
              data-testid={ `${data.price}${sale.id}` }
            >
              {`R$${totalPrice}`}
            </div>
          </div>
        </div>
        {data.address && (
          <div className="m-1" data-testid={ `${data.address}${sale.id}` }>
            {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
          </div>
        )}
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
