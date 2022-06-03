import PropTypes from 'prop-types';
import React from 'react';

function ProductCard(props) {
  const { product: { id, name, price, urlImage } } = props;
  // const [quantity, setQuantity] = useState(0);

  const priceBR = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  console.log(priceBR);

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
        { `R$ ${priceBR}` }
      </p>

      <img
        width="100px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ `cerveja ${name}` }
      />

      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        // onClick={ () => setQuantity(quantity + 1) }
      >
        +
      </button>

      <span
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        { 0 }
      </span>

      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        // onClick={ () => { if (quantity > 0) setQuantity(quantity - 1); } }
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
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,

};

export default ProductCard;
