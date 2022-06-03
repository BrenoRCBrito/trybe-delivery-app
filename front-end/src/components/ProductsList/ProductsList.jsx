// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Context from '../../context/Context';

function ProductsList() {
  const { products } = useContext(Context);
  return (
    <div>
      {
        products.length > 0 && products.map((product, index) => (
          <div key={ index }>
            <ProductCard product={ product } />
          </div>
        ))
      }
    </div>
  );
}

export default ProductsList;
