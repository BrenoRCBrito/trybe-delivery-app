import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [userData, setUserData] = useState('');
  const [products, setProducts] = useState([]);

  const saveProducts = (array) => {
    if (array.length > 0) {
      const productsToSave = array.map((product) => {
        const { price, ...rest } = product;
        return { ...rest, price: Number(price) };
      });
      setProducts(productsToSave);
    }
  };

  const context = {
    userData,
    setUserData,
    products,
    saveProducts,
  };

  return (
    <main>
      <Context.Provider value={ context }>
        {children}
      </Context.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
