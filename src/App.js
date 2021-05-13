import './Theme.less';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import LoggedInRouter from './LoggedInRouter';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';
import TendersProvider from './providers/TendersProvider';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Switch>
          <TendersProvider>
            <EventProvider>
              <Route exact path="/" component={Landing} />
              <LoggedInRouter />
            </EventProvider>
          </TendersProvider>

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
