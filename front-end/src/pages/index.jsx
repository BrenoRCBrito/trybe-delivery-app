import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';

function Pages() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route render={ () => <Redirect to={ { pathname: '/login' } } /> } />
    </Switch>
  );
}

export default Pages;
