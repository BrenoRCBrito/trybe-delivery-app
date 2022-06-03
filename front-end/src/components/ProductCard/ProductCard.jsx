import PropTypes from 'prop-types';
import React, { useState } from 'react';

function ProductCard(props) {
  const { product: { id, name, price, urlImage } } = props;
  const [quantity, setQuantity] = useState(0);

  const priceBR = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { priceBR }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ `cerveja ${name}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQuantity(quantity + 1) }
      >
        +
      </button>
      <p
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => { if (quantity > 0) setQuantity(quantity - 1); } }
      >
        -
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
  }).isRequired,

};

export default ProductCard;
