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
        m-auto border border-[#B1C2BE] min-h-[75vh]` }
        >
          <div className="flex bg-[#EAF1EF] justify-between items-center h-[6vh]">
            <p data-testid={ data.id } className="text-2xl font-extrabold mx-5">
              { `PEDIDO 000${sale.id}` }
            </p>
            <p data-testid={ data.seller } className="text-2xl">
              { `P.Vend: ${sale.seller.name}` }
            </p>
            <p data-testid={ data.date } className="text-2xl font-medium m-auto">
              {moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            </p>
            <p
              data-testid={ data.status }
              className={ `${sale.status === 'Pendente' ? 'bg-[#CCB800]' : 'undefined'}
              ${sale.status === 'Em Trânsito' ? 'bg-[#66CC00]' : 'undefined'}
              ${sale.status === 'Entregue' ? 'bg-[#00CC9B]' : 'undefined'}
              bg-opacity-75 px-12 py-[0.4rem] rounded-lg text-2xl uppercase font-medium` }
            >
              { sale.status }
            </p>
            { data.role === 'customer' && (
              <button
                disabled={ sale.status !== inProgress }
                data-testid={ data.button }
                onClick={ () => handleSubmit('Entregue') }
                type="button"
                className={ `text-lg h-[4.4vh] bg-[#036B52]
                rounded-lg px-5 mx-5 text-white disabled:opacity-30
                transition duration-150 enabled:hover:bg-[#035c47]` }
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
                  className={ `text-lg h-[4.4vh] bg-[#00CC9B]
                  rounded-lg px-5 ml-5 text-white disabled:opacity-30
                  transition duration-150 enabled:hover:bg-[#01b98e]` }
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  disabled={ sale.status !== 'Preparando' }
                  data-testid={ data.dispatchBtn }
                  onClick={ () => handleSubmit(inProgress) }
                  type="button"
                  className={ `text-lg h-[4.4vh] bg-[#036B52]
                  rounded-lg px-5 mx-5 text-white disabled:opacity-30
                  transition duration-150 enabled:hover:bg-[#035c47]` }
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
