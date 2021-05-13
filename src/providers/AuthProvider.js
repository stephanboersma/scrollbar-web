import { message } from 'antd';
import React, { useEffect, useState } from 'react';

import AuthContext from '../contexts/AuthContext';
import { auth } from '../firebase';
import { getStudyLines, getUser } from '../firebase/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [studylines, setStudylines] = useState([]);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    getStudyLines()
      .then((res) => {
        setStudylines(res);
      })
      .catch((error) => message.error(`An error occured: ${error.message}`));
  }, []);
  useEffect(() => {
    auth.onAuthStateChanged(async (authState) => {
      if (authState) {
        if (authState.uid) {
          getUser(authState.uid, {
            next: (snapshot) => {
              setUser({ ...snapshot.data(), id: snapshot.id });
              setLoadingAuthState(false);
            },
            error: (error) =>
              message.error('An error occurred ' + error.message),
          });
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
        studylines,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
