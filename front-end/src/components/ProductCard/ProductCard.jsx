import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../../context/Context';

function ProductCard(props) {
  const { product: { id, name, price, urlImage, quantity } } = props;
  const { setQuantity } = useContext(Context);

  const priceBR = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div
      className="flex flex-col w-[15vw] h-[50vh] m-5 border border-[#B1C2BE] shadow-login"
    >
      <div
        className="absolute flex w-[7vw] h-[6vh] justify-center items-center"
      >
        <h3
          data-testid={ `customer_products__element-card-price-${id}` }
          className="font-bold w-[100%] text-center text-[3vh]"
        >
          { priceBR }
        </h3>
      </div>

      <img
        width="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ `cerveja ${name}` }
        className="w-[100%] h-[60%] m-auto"
      />

      <div className="flex flex-col h-[30%] justify-center items-center bg-[#EAF1EF]">
        <h2
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </h2>

        <div className="flex h-[5.5vh] mt-2">
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ () => {
              if (quantity > 0) setQuantity(id, quantity - 1);
            } }
            className="w-[3.86vw] rounded-l-xl bg-[#036B52] text-white transition duration-150 active:bg-[#049775]"
          >
            -
          </button>

          <input
            value={ quantity }
            min="0"
            onChange={ ({ target }) => setQuantity(id, +target.value) }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className={ `${quantity === 0 ? 'text-gray-400' : 'undefined'}
            w-[3.22vw] border border-[#001813] text-center` }
          />

          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ () => setQuantity(id, quantity + 1) }
            className="w-[3.86vw] rounded-r-xl bg-[#036B52] text-white transition duration-150 active:bg-[#049775]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
