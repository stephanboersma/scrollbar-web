import './Theme.less';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import EventManagement from './pages/Admin/EventManagement';
import ShiftManagement from './pages/Admin/ShiftManagement';
import UserManagement from './pages/Admin/UserManagement';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MembersPortal from './pages/MembersPortal';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ShiftPlan from './pages/ShiftPlan';
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
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/members"
            requiredRoles={['regular_access']}
            component={MembersPortal}
          />
          <PrivateRoute
            exact
            path="/shifts"
            requiredRoles={['regular_access']}
            component={ShiftPlan}
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
          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
