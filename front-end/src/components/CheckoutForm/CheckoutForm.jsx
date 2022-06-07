import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function CheckoutForm(props) {
  const { sellers, handleChange } = props;
  const { cart } = useContext(Context);

  return (
    <div>
      <form action="">
        <label htmlFor="sellers-select">
          P. Vendedora Responsável:
          <select
            name="sellerId"
            id="sellers-select"
            value={ cart.sellerId }
            onChange={ handleChange }
            required
          >
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
            type="text"
            name="deliveryNumber"
            id="delivery-number"
            placeholder="Número"
            value={ cart.deliveryNumber }
            onChange={ handleChange }
            required
          />
        </label>
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
