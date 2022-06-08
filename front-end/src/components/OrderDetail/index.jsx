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
              data-testid={ `customer_order_details__element
              -order-details-label-seller-name` }
            >
              { `P.Vend: ${sale.seller.name}` }
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {moment(sale.saleDate).locale('pt-br').format('DD/MM/YYYY') }
            </p>
            <p
              data-testid={ `customer_order_details__element-order
          -details-label-delivery-status` }
            >
              { sale.status }
            </p>
            <button
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
              { sale.products.map((product, index) => (
                <tr key={ product.id }>
                  <td
                    data-testid={ `customer_order_details__element
                  -order-table-item-number-${index}` }
                  >
                    { index + 1 }
                  </td>
                  <td
                    data-testid={ `customer_order_details__element
                  -order-table-name-${index}` }
                  >
                    { product.name }
                  </td>
                  <td
                    data-testid={ `customer_order_details__element
                  -order-table-quantity-${index}` }
                  >
                    { product.SaleProduct.quantity }
                  </td>
                  <td
                    data-testid={ `customer_order_details__element
                  -order-table-unit-price-${index}` }
                  >
                    { product.price }
                  </td>
                  <td
                    data-testid={ `customer_order_details__element
                  -order-table-sub-total-${index}` }
                  >
                    { product.price * product.SaleProduct.quantity }
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          <div
            data-testid="customer_order_details__element-order-total-price"
          >
            { `Total: ${sale.totalPrice}` }
          </div>
          {/* <h1>ola</h1> */}
        </div>
      )}
    </div>

  );
}

export default OrderDetail;
