import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CustomerProduct from './CustomerProduct';
import Admin from './Admin';
import CustomerOrders from './CustomerOrders';
import SellerOrders from './SellerOrders';
import CustomerCheckout from './CustomerCheckout';
import OrderDetails from './OrderDetails';
import data from '../components/utils/detailsData';

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
        render={ () => <OrderDetails data={ data.Customer } /> }
      />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route
        exact
        path="/seller/orders/:id"
        render={ () => <OrderDetails data={ data.Seller } /> }
      />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route><Redirect to="/login" /></Route>
    </Switch>
  );
}

export default Pages;
