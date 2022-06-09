import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function CheckoutForm(props) {
  const { sellers, handleChange, handleSubmit } = props;
  const { checkout } = useContext(Context);
  const { cart: { sellerId, deliveryAddress, deliveryNumber } } = checkout;

  return (
    <div>
      <form id="checkout-form">
        <label htmlFor="sellers-select">
          P. Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            id="sellers-select"
            value={ sellerId }
            onChange={ handleChange }
            required
          >
            <option value="" hidden disabled>Selecione</option>
            { sellers.length && sellers.map(({ id, name }, index) => (
              <option
                key={ index }
                value={ id }
              >
                { name }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="delivery-address">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            name="deliveryAddress"
            id="delivery-address"
            placeholder="Endereço"
            value={ deliveryAddress }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="delivery-number">
          Número
          <input
            data-testid="customer_checkout__input-addressNumber"
            type="text"
            name="deliveryNumber"
            id="delivery-number"
            placeholder="Número"
            value={ deliveryNumber }
            onChange={ handleChange }
            required
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ handleSubmit }
          disabled={ !(sellerId && deliveryAddress && deliveryNumber) }
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

CheckoutForm.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CheckoutForm;
