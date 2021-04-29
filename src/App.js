import './Theme.less';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Admin from './pages/Admin';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MembersPortal from './pages/MembersPortal';
import Profile from './pages/Profile';
import AuthProvider from './providers/AuthProvider';
import ThemeProvider from './providers/ThemeProvider';
import PrivateRoute from './styles/atoms/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/members" component={MembersPortal} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/administration" component={Admin} />
          <Redirect to="/login" />
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
