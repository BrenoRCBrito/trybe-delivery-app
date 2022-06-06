import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CustomerProduct from './CustomerProduct';
<<<<<<< HEAD
// import SellerOrders from './SellerOrders';
import Admin from './Admin';
=======
import CustomerOrders from './CustomerOrders';
import SellerOrders from './SellerOrders';
>>>>>>> eb2af964a3061cebd15c9bab731e15b542b59fa0

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProduct } />
<<<<<<< HEAD
      <Route exact path="/admin/manage" component={ Admin } />
      {/* <Route exact path="/seller/orders" component={ SellerOrders } /> */}
=======
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
>>>>>>> eb2af964a3061cebd15c9bab731e15b542b59fa0
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
