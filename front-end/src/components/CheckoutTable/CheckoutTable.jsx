import React from 'react';
import PropTypes from 'prop-types';

function CheckoutTable(props) {
  const { products, handleRemoveItem } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {products.length
          && products.map(({ price, name, quantity, id }, i) => {
            const subTotal = price * quantity;

            const priceBR = price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            });
            const subTotalBR = subTotal.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            });

            return (
              <tr key={ `checkout-${i}` }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${i}`
                  }
                >
                  {i + 1}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${i}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
                >
                  {quantity}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                >
                  {priceBR}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                >
                  {subTotalBR}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                    onClick={ () => handleRemoveItem(id) }
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

CheckoutTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default CheckoutTable;
