import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function CheckoutForm(props) {
  const { sellers, handleChange, handleSubmit } = props;
  const { checkout } = useContext(Context);
  const { cart: { sellerId, deliveryAddress, deliveryNumber } } = checkout;

  return (
    <form className="flex flex-col" id="checkout-form">
      <div className="flex justify-around m-5">
        <label htmlFor="sellers-select" className="flex flex-col text-lg w-[19.32vw]">
          <span className="ml-3 my-2">P. Vendedora Responsável:</span>
          <select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            id="sellers-select"
            value={ sellerId }
            onChange={ handleChange }
            required
            className="h-[6.48vh] border border-[#001813] rounded-[5px] pl-3"
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
        <label htmlFor="delivery-address" className="flex flex-col text-lg w-[40vw]">
          <span className="ml-3 my-2">Endereço</span>
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            name="deliveryAddress"
            id="delivery-address"
            placeholder="Endereço"
            value={ deliveryAddress }
            onChange={ handleChange }
            required
            className="h-[6.48vh] border border-[#001813] rounded-[5px] pl-3"
          />
        </label>
        <label htmlFor="delivery-number" className="flex flex-col text-lg w-[18.69vw]">
          <span className="ml-3 my-2">Número</span>
          <input
            data-testid="customer_checkout__input-addressNumber"
            type="text"
            name="deliveryNumber"
            id="delivery-number"
            placeholder="Número"
            value={ deliveryNumber }
            onChange={ handleChange }
            required
            className="h-[6.48vh] border border-[#001813] rounded-[5px] pl-3"
          />
        </label>
      </div>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleSubmit }
        disabled={ !(sellerId && deliveryAddress && deliveryNumber) }
        className="w-[35%] h-[8.25vh] m-auto mb-4 bg-[#036B52] rounded-[10px] text-white text-4xl"
      >
        Finalizar pedido
      </button>
    </form>
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
