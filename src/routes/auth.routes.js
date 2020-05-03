import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" component={Register} />

    <Route path="/**">
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default AuthRoutes;
