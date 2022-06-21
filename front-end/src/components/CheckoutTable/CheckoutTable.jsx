import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function CheckoutTable(props) {
  const { products, handleRemoveItem } = props;
  return (
    <table className="m-5 border-separate border-spacing-y-2">
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
        { products.map(({ price, name, quantity, id }, i) => {
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
                className="baseTable bg-[#2FC18C] w-[4vw] rounded-l-lg"
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
                className="baseTable w-[52.5vw] bg-[#EAF1EF]"
              >
                {name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
                className="baseTable bg-[#036B52] w-[8.69vw] text-white"
              >
                {quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                className="baseTable bg-[#421981] w-[8.69vw] text-white"
              >
                {priceBR}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                className="baseTable bg-[#056CF9] w-[8.69vw] text-white"
              >
                {subTotalBR}
              </td>
              <td
                className={ `baseTable bg-[#2FC18C]
                text-white rounded-r-lg transition duration-300 hover:bg-[#3ca780]` }
              >
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  onClick={ () => handleRemoveItem(id) }
                  className="w-[12.39vw] h-[100%]"
                >
                  Remover
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
