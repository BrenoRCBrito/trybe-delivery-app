import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [userData, setUserData] = useState('');

  const context = {
    userData,
    setUserData,
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
