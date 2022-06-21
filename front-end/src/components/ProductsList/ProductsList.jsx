// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Context from '../../context/Context';

function ProductsList() {
  const { products } = useContext(Context);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4">
        {
          products.length && products.map((product, index) => (
            <div key={ index }>
              <ProductCard product={ product } />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ProductsList;
