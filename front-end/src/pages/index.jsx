import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CustomerProduct from './CustomerProduct';
import CustomerCheckout from './CustomerCheckout';

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProduct } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
