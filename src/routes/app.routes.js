import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import TimeRegister from '../pages/TimeRegister';

const AppRoutes = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/time-register" component={TimeRegister} />

    <Route path="/**">
      <Redirect to="/home" />
    </Route>
  </Switch>
);

export default AppRoutes;
