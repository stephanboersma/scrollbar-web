import React from 'react';

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
  );
};
export default LoggedInRouter;
