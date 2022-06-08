import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../../context/Context';
import { getSale } from '../../services';

function OrderDetail() {
  const { userData, initializeUser } = useContext(Context);
  const { id } = useParams();
  const [sale, setSale] = useState({});

  useEffect(() => {
    initializeUser();
    if (userData.token) {
      getSale(userData.token, id)
        .then((order) => setSale(order[0]))
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line
  }, [id, userData.token]);

  const sellerName = 'customer_order_details__element-order-details-label-seller-name';
  const orderDate = 'customer_order_details__element-order-details-label-order-date';
  const delStatus = 'customer_order_details__element-order-details-label-delivery-status';

  const totalPrice = sale.totalPrice
    ? Number(sale.totalPrice).toLocaleString('pt-br', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    : '0,00';

  return (
    <div>
      { sale.id && (
        <div>
          <div>
            <p
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              { `PEDIDO 000${sale.id}` }
            </p>
            <p
              data-testid={ sellerName }
            >
              { `P.Vend: ${sale.seller.name}` }
            </p>
            <p
              data-testid={ orderDate }
            >
              {moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            </p>
            <p
              data-testid={ delStatus }
            >
              { sale.status }
            </p>
            <button
              disabled={
                sale.status === 'Pendente'
                || sale.status === 'Preparando'
                || sale.status === 'Entregue'
              }
              data-testid="customer_order_details__button-delivery-check"
              type="button"
            >
              MARCAR COMO ENTREGUE
            </button>
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
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-item-number-${i}`
                      }
                    >
                      { i + 1 }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-name-${i}`
                      }
                    >
                      { product.name }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-quantity-${i}`
                      }
                    >
                      { product.SaleProduct.quantity }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-unit-price-${i}`
                      }
                    >
                      { product.price }
                    </td>
                    <td
                      data-testid={
                        `customer_order_details__element-order-table-sub-total-${i}`
                      }
                    >
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
              data-testid="customer_order_details__element-order-total-price"
            >
              { totalPrice }
            </span>
          </div>
          {/* <h1>ola</h1> */}
        </div>
      )}
    </div>

  );
}

export default OrderDetail;
