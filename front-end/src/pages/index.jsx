import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CustomerProduct from './CustomerProduct';
// import SellerOrders from './SellerOrders';
import Admin from './Admin';

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProduct } />
      <Route exact path="/admin/manage" component={ Admin } />
      {/* <Route exact path="/seller/orders" component={ SellerOrders } /> */}
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
