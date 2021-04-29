import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { authenticated, loadingAuthState } = useContext(AuthContext);
  if (loadingAuthState) {
    return <></>;
  }
  return (
    <Route
      {...rest}
      render={() =>
        authenticated ? (
          <RouteComponent />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
