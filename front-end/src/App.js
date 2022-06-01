import React from 'react';
import './App.css';
import Pages from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Pages />
    </Provider>
  );
}

export default App;
