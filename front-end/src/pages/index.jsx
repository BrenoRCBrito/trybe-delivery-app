import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import CustomerProduct from './CustomerProduct';

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ CustomerProduct } />
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
