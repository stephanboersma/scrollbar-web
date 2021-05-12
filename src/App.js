import './Theme.less';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import EventManagement from './pages/Admin/EventManagement';
import ShiftManagement from './pages/Admin/ShiftManagement';
import UserManagement from './pages/Admin/UserManagement';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ShiftPlan from './pages/ShiftPlan';
import AuthProvider from './providers/AuthProvider';
import EngagementProvider from './providers/EngagementProvider';
import EventProvider from './providers/EventProvider';
import ShiftProvider from './providers/ShiftProvider';
import TendersProvider from './providers/TendersProvider';
import ThemeProvider from './providers/ThemeProvider';
import PrivateRoute from './styles/atoms/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <TendersProvider>
            <EventProvider>
              <ShiftProvider>
                <EngagementProvider>
                  <PrivateRoute
                    exact
                    path="/members"
                    requiredRoles={['regular_access']}
                    component={ShiftPlan}
                  />
                  <PrivateRoute
                    exact
                    path="/manage/events"
                    requiredRoles={['event_manager']}
                    component={EventManagement}
                  />
                  <PrivateRoute
                    exact
                    path="/manage/shifts"
                    requiredRoles={['shift_manager']}
                    component={ShiftManagement}
                  />
                  <PrivateRoute
                    exact
                    path="/profile"
                    requiredRoles={[]}
                    component={Profile}
                  />
                  <PrivateRoute
                    exact
                    path="/manage/users"
                    requiredRoles={['user_manager']}
                    component={UserManagement}
                  />

                  <PrivateRoute
                    exact
                    path="/settings"
                    requiredRoles={['admin']}
                    component={Settings}
                  />
                </EngagementProvider>
              </ShiftProvider>
            </EventProvider>
          </TendersProvider>

          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
