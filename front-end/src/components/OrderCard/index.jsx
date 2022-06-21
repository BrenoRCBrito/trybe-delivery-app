import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

function OrderCard(props) {
  const { sale, data } = props;
  const goTo = useHistory();
  const date = moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY');
  const totalPrice = Number(sale.totalPrice).toLocaleString('pt-br', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleClick = () => {
    goTo.push(`/${data.role}/orders/${sale.id}`);
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="flex flex-row border shadow-login m-5 items-center max-h-fit max-w-fit"
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
      <div className="flex flex-col bg-gray-200 min-h-[7rem]">
        <div className="flex flex-row items-center justify-evenly">
          <div
            className={ `${sale.status === 'Pendente' ? 'bg-pending' : 'undefined'}
            ${sale.status === 'Entregue' ? 'bg-[#3BD5B0]' : 'undefined'}
            ${sale.status === 'Preparando' ? 'bg-[#87D53C]' : 'undefined'}
            rounded m-1 px-8 py-6 uppercase font-bold` }
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
          <div
            className="m-2 text-xs self-end"
            data-testid={ `${data.address}${sale.id}` }
          >
            {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
          </div>
        )}
      </div>
    </button>
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
