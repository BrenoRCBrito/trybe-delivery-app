import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CustomerProduct from './CustomerProduct';
import Admin from './Admin';
import CustomerOrders from './CustomerOrders';
import SellerOrders from './SellerOrders';
import CustomerCheckout from './CustomerCheckout';

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProduct } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route
        exact
        path="/customer/orders/:id"
        render={ ({ match }) => <CustomerOrders match={ match } /> }
      />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
