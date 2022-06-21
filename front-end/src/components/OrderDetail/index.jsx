import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../../context/Context';
import { getSale, updateSale } from '../../services';
import './index.css';

function OrderDetail(props) {
  const { token, initializeUser } = useContext(Context);
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const { data } = props;
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    initializeUser();
    if (token) {
      getSale(token, id)
        .then((order) => setSale(order[0]))
        .catch((e) => console.log(e));
    }
  }, [id, initializeUser, token, updateStatus]);

  const handleSubmit = (status) => {
    updateSale(token, id, status)
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
        <div
          className={ `flex flex-col shadow-login w-[80%]
        m-auto border border-[#B1C2BE] min-h-[85vh]` }
        >
          <div className="flex bg-[#EAF1EF] justify-between items-center h-[6vh]">
            <p data-testid={ data.id } className="font-extrabold ml-3">
              { `PEDIDO 000${sale.id}` }
            </p>
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
                || sale.status === 'Preparando' }
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

          <table className="m-5 border-separate border-spacing-y-2 mb-auto">
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
                    <td
                      data-testid={ `${data.tItem}${i}` }
                      className="baseTable bg-[#2FC18C] w-[4vw] rounded-l-lg"
                    >
                      { i + 1 }
                    </td>
                    <td
                      className="baseTable w-[52.5vw] bg-[#EAF1EF]"
                      data-testid={ `${data.tName}${i}` }
                    >
                      { product.name }
                    </td>
                    <td
                      className="baseTable bg-[#036B52] w-[8.69vw] text-white"
                      data-testid={ `${data.tQuantity}${i}` }
                    >
                      { product.SaleProduct.quantity }
                    </td>
                    <td
                      className="baseTable bg-[#421981] w-[8.69vw] text-white"
                      data-testid={ `${data.tPrice}${i}` }
                    >
                      { product.price }
                    </td>
                    <td
                      className={ `baseTable bg-[#056CF9] w-[8.69vw]
                      text-white rounded-r-lg` }
                      data-testid={ `${data.tTotal}${i}` }
                    >
                      { subTotalBR }
                    </td>
                  </tr>
                );
              }) }
            </tbody>
          </table>
          <div
            className={ `flex self-end w-[20%] h-[8vh] justify-center
            items-center bg-[#036B52] m-3 rounded-[10px] text-white text-4xl` }
          >
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
