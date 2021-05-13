import { message } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';

const PrivateRoute = ({
  component: RouteComponent,
  requiredRoles,
  ...rest
}) => {
  const { authenticated, loadingAuthState, user } = useContext(AuthContext);
  const history = useHistory();
  const hasPermission = () =>
    requiredRoles.every((role) => user.roles.includes(role)) || user.isAdmin;
  if (loadingAuthState) {
    return <></>;
  }
  return (
    <Route
      {...rest}
      render={() => {
        if (authenticated) {
          if (user.roles) {
            if (hasPermission()) {
              return <RouteComponent />;
            } else {
              message.warning(
                'You do not have sufficient permissions to access this page.'
              );
              history.push('/members/profile');
            }
          }
        } else {
          return <Redirect to={{ pathname: '/login' }} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
