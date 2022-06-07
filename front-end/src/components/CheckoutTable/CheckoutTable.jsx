import React from 'react';
import PropTypes from 'prop-types';

function CheckoutTable(props) {
  const { products } = props;
  return (
    <tbody>
      { products.length && products.map(({ price, name, quantity, id }, index) => {
        const i = index + 1;
        const subTotal = price * quantity;

        const priceBR = price
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        const subTotalBR = subTotal
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        return (
          <tr key={ i }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              { i }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-${i}` }
            >
              { name }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              { quantity }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }

            >
              { priceBR }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              { subTotalBR }
            </td>
            <td>
              <button
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                onClick={ () => console.log(id) }
              >
                x
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

CheckoutTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default CheckoutTable;
