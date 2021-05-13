import React from 'react';
import { Redirect } from 'react-router';

import EventManagement from './pages/Admin/EventManagement';
import ShiftManagement from './pages/Admin/ShiftManagement';
import UserManagement from './pages/Admin/UserManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ShiftPlan from './pages/ShiftPlan';
import EngagementProvider from './providers/EngagementProvider';
import ShiftProvider from './providers/ShiftProvider';
import PrivateRoute from './styles/atoms/PrivateRoute';
const LoggedInRouter = () => {
  return (
    <ShiftProvider>
      <EngagementProvider>
        <PrivateRoute
          exact
          path="/members/shifts"
          requiredRoles={['regular_access']}
          component={ShiftPlan}
        />
        <PrivateRoute
          exact
          path="/members/manage/events"
          requiredRoles={['event_manager']}
          component={EventManagement}
        />
        <PrivateRoute
          exact
          path="/members/manage/shifts"
          requiredRoles={['shift_manager']}
          component={ShiftManagement}
        />
        <PrivateRoute
          exact
          path="/members/profile"
          requiredRoles={[]}
          component={Profile}
        />
        <PrivateRoute
          exact
          path="/members/manage/users"
          requiredRoles={['user_manager']}
          component={UserManagement}
        />

        <PrivateRoute
          exact
          path="/members/settings"
          requiredRoles={['admin']}
          component={Settings}
        />
        <Redirect to="/members/shifts" />
      </EngagementProvider>
    </ShiftProvider>
  );
};
export default LoggedInRouter;
