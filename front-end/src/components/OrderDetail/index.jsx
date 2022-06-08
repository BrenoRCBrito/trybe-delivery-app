import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../../context/Context';
import { getSale, updateSale } from '../../services';

function OrderDetail(props) {
  const { userData, initializeUser } = useContext(Context);
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const { data } = props;
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    initializeUser();
    if (userData.token) {
      getSale(userData.token, id)
        .then((order) => setSale(order[0]))
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line
  }, [id, userData.token, updateStatus]);

  const handleSubmit = (status) => {
    updateSale(userData.token, id, status)
      .then(() => setUpdateStatus(!updateStatus))
      .catch((e) => console.log(e));
  };

  const totalPrice = sale.totalPrice
    ? Number(sale.totalPrice).toLocaleString('pt-br', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : '0,00';

  const inProgress = 'Em Trânsito';

  return (
    <div>
      { sale.id && (
        <div>
          <div>
            <p data-testid={ data.id }>{ `PEDIDO 000${sale.id}` }</p>
            <p data-testid={ data.seller }>{ `P.Vend: ${sale.seller.name}` }</p>
            <p data-testid={ data.date }>
              {moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            </p>
            <p data-testid={ data.status }>{ sale.status }</p>
            { data.role === 'customer' && (
              <button
                disabled={ sale.status !== inProgress }
                data-testid={ data.button }
                onClick={ () => handleSubmit('Entregue') }
                type="button"
              >
                MARCAR COMO ENTREGUE
              </button>)}
            { data.role === 'seller' && (
              <div>
                <button
                  disabled={ sale.status === 'Entregue'
                || sale.status === inProgress
                || sale.stauts === 'Preparando' }
                  data-testid={ data.preparingBtn }
                  onClick={ () => handleSubmit('Preparando') }
                  type="button"
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  disabled={ sale.status !== 'Preparando' }
                  data-testid={ data.dispatchBtn }
                  onClick={ () => handleSubmit(inProgress) }
                  type="button"
                >
                  SAIU PARA ENTREGA
                </button>
              </div>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              { sale.products.map((product, i) => {
                const subTotal = product.price * product.SaleProduct.quantity;
                const subTotalBR = subTotal.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                });
                return (
                  <tr key={ i }>
                    <td data-testid={ `${data.tItem}${i}` }>
                      { i + 1 }
                    </td>
                    <td data-testid={ `${data.tName}${i}` }>
                      { product.name }
                    </td>
                    <td data-testid={ `${data.tQuantity}${i}` }>
                      { product.SaleProduct.quantity }
                    </td>
                    <td data-testid={ `${data.tPrice}${i}` }>
                      { product.price }
                    </td>
                    <td data-testid={ `${data.tTotal}${i}` }>
                      { subTotalBR }
                    </td>
                  </tr>
                );
              }) }
            </tbody>
          </table>
          <div>
            <span>Total: R$ </span>
            <span
              data-testid={ data.total }
            >
              { totalPrice }
            </span>
          </div>
        </div>
      )}
    </div>

  );
}

OrderDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default OrderDetail;
