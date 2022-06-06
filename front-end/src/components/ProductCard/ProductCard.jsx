import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../../context/Context';

function ProductCard(props) {
  const { product: { id, name, price, urlImage, quantity } } = props;
  const { setQuantity } = useContext(Context);

  const priceBR = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div>
      <br />
      <h2
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </h2>

      <h3
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { priceBR }
      </h3>

      <img
        width="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ `cerveja ${name}` }
      />

      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => {
          if (quantity > 0) setQuantity(id, quantity - 1);
        } }
      >
        -
      </button>

      <input
        type="number"
        value={ quantity }
        min="0"
        onChange={ ({ target }) => setQuantity(id, +target.value) }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />

      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQuantity(id, quantity + 1) }
      >
        +
      </button>

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
