import React from 'react';

import EventManagement from './pages/Admin/EventManagement';
import Settings from './pages/Admin/Settings';
import ShiftManagement from './pages/Admin/ShiftManagement';
import UserManagement from './pages/Admin/UserManagement';
import Profile from './pages/Profile';
import ShiftPlan from './pages/ShiftPlan';
import EngagementProvider from './providers/EngagementProvider';
import ShiftProvider from './providers/ShiftProvider';
import PrivateRoute from './styles/atoms/PrivateRoute';
const LoggedInRouter = () => {
  return (
    <ShiftProvider>
      <EngagementProvider>
        <PrivateRoute
          path="/members/shifts"
          requiredRoles={['regular_access']}
          component={ShiftPlan}
        />
        <PrivateRoute
          path="/members/manage/events"
          requiredRoles={['event_manager']}
          component={EventManagement}
        />
        <PrivateRoute
          path="/members/manage/shifts"
          requiredRoles={['shift_manager']}
          component={ShiftManagement}
        />
        <PrivateRoute
          path="/members/profile"
          requiredRoles={[]}
          component={Profile}
        />
        <PrivateRoute
          path="/members/manage/users"
          requiredRoles={['user_manager']}
          component={UserManagement}
        />

        <PrivateRoute
          path="/members/settings"
          requiredRoles={['admin']}
          component={Settings}
        />
      </EngagementProvider>
    </ShiftProvider>
  );
};
export default LoggedInRouter;
