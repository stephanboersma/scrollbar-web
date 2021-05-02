import { message } from 'antd';
import React, { useEffect, useState } from 'react';

import AuthContext from '../contexts/AuthContext';
import { auth } from '../firebase';
import { getUser } from '../firebase/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(async (authState) => {
      if (authState) {
        if (authState.uid) {
          getUser(authState.uid)
            .then((_user) => {
              setUser(_user);
              console.log(_user);
              setLoadingAuthState(false);
            })
            .catch((error) =>
              message.error(`An error occured: ${error.message}`)
            );
        } else {
          setLoadingAuthState(false);
        }
      } else {
        setLoadingAuthState(false);
      }
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
