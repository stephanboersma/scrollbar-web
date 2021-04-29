import React, { useEffect, useState } from 'react';

import AuthContext from '../contexts/AuthContext';
import { auth } from '../firebase';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authState) => {
      setUser(authState);
      setLoadingAuthState(false);
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
