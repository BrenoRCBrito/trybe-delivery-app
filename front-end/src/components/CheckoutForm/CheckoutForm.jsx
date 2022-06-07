import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function CheckoutForm(props) {
  const { sellers, handleChange } = props;
  const [disabled, setDisabled] = useState(true);
  const { cart } = useContext(Context);

  useEffect(() => {
    if (cart.sellerId && cart.deliveryAddress && cart.deliveryNumber) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    // eslint-disable-next-line
  }, [cart.sellerId, cart.deliveryAddress, cart.deliveryNumber]);

  return (
    <div>
      <form id="checkout-form">
        <label htmlFor="sellers-select">
          P. Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            id="sellers-select"
            value={ cart.sellerId }
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
            value={ cart.deliveryAddress }
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
            value={ cart.deliveryNumber }
            onChange={ handleChange }
            required
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ () => console.log('cliquei') }
          disabled={ disabled }
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
};

export default CheckoutForm;
