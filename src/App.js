import './Theme.less';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import LoggedInRouter from './LoggedInRouter';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';
import TendersProvider from './providers/TendersProvider';
import ThemeProvider from './providers/ThemeProvider';
import PrivateRoute from './styles/atoms/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Switch>
          <TendersProvider>
            <EventProvider>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reset-password" component={ResetPassword} />

              <PrivateRoute
                path="/members"
                requiredRoles={[]}
                component={LoggedInRouter}
              />
            </EventProvider>
          </TendersProvider>

          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
